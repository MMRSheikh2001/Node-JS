const { sequelize } = require('../config/database');
const User = require('../models/user.model');
const PoliceStation = require('../models/police-station.model');
const District = require('../models/district.model');
const Division = require('../models/division.model');
const Customer = require('../models/customer.model');
const Rider = require('../models/rider.model');
const Agent = require('../models/agent.model');
const Parcel = require('../models/parcel.model');
const ParcelHistory = require('../models/parcel-history.model');
const {
    ParcelStatus,
    ParcelType,
    PaymentMethod,
    PaymentStatus,
    Priority,
    ServiceType,
    BookingSource
} = require('../utils/enums');
const { generateTrackingCode, calculateCharge, estimateDelivery } = require('../utils/parcelPricing');
const { badRequest, forbidden, notFound, conflict } = require('../utils/httpError');

// A parcel in one of these states is finished; riders can no longer change it.
const TERMINAL_STATUSES = [ParcelStatus.DELIVERED, ParcelStatus.CANCELLED, ParcelStatus.RETURNED];

// ─────────────────────────────────────────────────────────────
// Eager-loading: everything the response DTO needs, in one query.
// PoliceStation -> District -> Division is repeated for origin,
// destination and current hub, so it lives in a small builder.
// ─────────────────────────────────────────────────────────────
const stationWithLocation = (as) => ({
    model: PoliceStation,
    as,
    include: [{ model: District, as: 'district', include: [{ model: Division, as: 'division' }] }]
});

const PARCEL_INCLUDE = [
    stationWithLocation('originPoliceStation'),
    stationWithLocation('destinationPoliceStation'),
    stationWithLocation('currentHub'),
    { model: Customer, as: 'customer', include: [{ model: User, as: 'user' }] },
    { model: Rider, as: 'rider', include: [{ model: User, as: 'user' }] },
    {
        model: Agent,
        as: 'bookedByAgent',
        include: [{ model: User, as: 'user' }, { model: PoliceStation, as: 'hub' }]
    },
    {
        model: ParcelHistory,
        as: 'history',
        include: [{ model: Rider, as: 'performedBy', include: [{ model: User, as: 'user' }] }]
    }
];

// ─────────────────────────────────────────────────────────────
// Small validation helpers. Each one either returns a clean value
// or throws a 400 with a message the client can actually act on.
// ─────────────────────────────────────────────────────────────
const isMissing = (value) => value === undefined || value === null || value === '';

function parseId(value, fieldName) {
    if (isMissing(value)) throw badRequest(`${fieldName} is required.`);
    const n = Number(value);
    if (!Number.isInteger(n) || n <= 0) {
        throw badRequest(`${fieldName} must be a positive whole number.`);
    }
    return n;
}

function parseOptionalId(value, fieldName) {
    return isMissing(value) ? null : parseId(value, fieldName);
}

function requireText(value, fieldName) {
    if (typeof value !== 'string' || value.trim() === '') {
        throw badRequest(`${fieldName} is required.`);
    }
    return value.trim();
}

// Accepts any casing ("express" -> "EXPRESS"); returns `fallback` when omitted.
function parseEnum(value, enumObject, fieldName, fallback) {
    if (isMissing(value)) {
        if (fallback === undefined) throw badRequest(`${fieldName} is required.`);
        return fallback;
    }
    const upper = String(value).toUpperCase();
    const allowed = Object.values(enumObject);
    if (!allowed.includes(upper)) {
        throw badRequest(`Invalid ${fieldName}: ${value}. Allowed values: ${allowed.join(', ')}`);
    }
    return upper;
}

function parseWeight(value, fallback) {
    if (isMissing(value)) {
        if (fallback === undefined) throw badRequest('weight is required.');
        return fallback;
    }
    const n = Number(value);
    if (!Number.isFinite(n) || n <= 0) throw badRequest('weight must be a number greater than 0.');
    return n;
}

function parseCodAmount(value) {
    if (isMissing(value)) return 0;
    const n = Number(value);
    if (!Number.isFinite(n) || n < 0) throw badRequest('codAmount must be 0 or more.');
    return n;
}

const firstNonBlank = (...values) => values.find((v) => typeof v === 'string' && v.trim() !== '');

async function requireStation(id, label) {
    const station = await PoliceStation.findByPk(id);
    if (!station) throw notFound(`${label} not found with id: ${id}`);
    return station;
}

// ─────────────────────────────────────────────────────────────
// Loading
// ─────────────────────────────────────────────────────────────
async function getById(id) {
    const parcel = await Parcel.findByPk(id, { include: PARCEL_INCLUDE });
    if (!parcel) throw notFound('Parcel not found');
    return parcel;
}

const NEWEST_FIRST = [['id', 'DESC']];

const getAll = () => Parcel.findAll({ include: PARCEL_INCLUDE, order: NEWEST_FIRST });

const getByCustomer = (customerId) =>
    Parcel.findAll({ where: { customerId }, include: PARCEL_INCLUDE, order: NEWEST_FIRST });

const getByRider = (riderId) =>
    Parcel.findAll({ where: { riderId }, include: PARCEL_INCLUDE, order: NEWEST_FIRST });

// Parcels waiting for a rider: still PENDING and nobody assigned yet.
const getPendingUnassigned = () =>
    Parcel.findAll({
        where: { status: ParcelStatus.PENDING, riderId: null },
        include: PARCEL_INCLUDE,
        order: NEWEST_FIRST
    });

async function track(trackingCode) {
    const parcel = await Parcel.findOne({ where: { trackingCode }, include: PARCEL_INCLUDE });
    if (!parcel) throw notFound(`No parcel found with tracking code: ${trackingCode}`);
    return parcel;
}

// ─────────────────────────────────────────────────────────────
// Price preview (no database write)
// ─────────────────────────────────────────────────────────────
function previewCharge({ weight, serviceType, codAmount }) {
    const w = parseWeight(weight);
    const type = parseEnum(serviceType, ServiceType, 'serviceType');
    const cod = parseCodAmount(codAmount);

    return {
        weight: w,
        serviceType: type,
        codAmount: cod,
        deliveryCharge: calculateCharge(w, type, cod),
        estimatedDelivery: estimateDelivery(type)
    };
}

// ─────────────────────────────────────────────────────────────
// Booking
// ─────────────────────────────────────────────────────────────

// Validates and normalises the part of a booking that every booking has,
// no matter who makes it (receiver, parcel details, service, payment,
// stations). Nothing is written to the database here.
async function prepareParcelFields(data) {
    const serviceType = parseEnum(data.serviceType, ServiceType, 'serviceType', ServiceType.STANDARD);
    const weight = parseWeight(data.weight, 0.5);
    const codAmount = parseCodAmount(data.codAmount);

    const originId = parseOptionalId(data.originPoliceStationId, 'originPoliceStationId');
    const destinationId = parseOptionalId(data.destinationPoliceStationId, 'destinationPoliceStationId');
    const originStation = originId ? await requireStation(originId, 'Origin police station') : null;
    if (destinationId) await requireStation(destinationId, 'Destination police station');

    return {
        originStation,
        fields: {
            receiverName: requireText(data.receiverName, 'receiverName'),
            receiverPhone: requireText(data.receiverPhone, 'receiverPhone'),
            receiverAddress: requireText(data.receiverAddress, 'receiverAddress'),
            parcelType: parseEnum(data.parcelType, ParcelType, 'parcelType', null),
            weight,
            description: data.description,
            specialInstructions: data.specialInstructions,
            serviceType,
            priority: parseEnum(data.priority, Priority, 'priority', Priority.NORMAL),
            paymentMethod: parseEnum(data.paymentMethod, PaymentMethod, 'paymentMethod', PaymentMethod.COD),
            paymentStatus: PaymentStatus.PENDING,
            codAmount,
            deliveryCharge: calculateCharge(weight, serviceType, codAmount),
            estimatedDelivery: estimateDelivery(serviceType),
            originPoliceStationId: originId,
            destinationPoliceStationId: destinationId,
            status: ParcelStatus.PENDING,
            trackingCode: generateTrackingCode()
        }
    };
}

// Saves a new parcel and its first history row ("booked") together.
// If either insert fails, neither is kept.
async function saveNewParcel(parcelData, originStation, note) {
    const parcelId = await sequelize.transaction(async (t) => {
        const parcel = await Parcel.create(parcelData, { transaction: t });

        await ParcelHistory.create({
            parcelId: parcel.id,
            status: ParcelStatus.PENDING,
            note,
            location: originStation ? `${originStation.name} Hub` : 'Main Hub'
        }, { transaction: t });

        return parcel.id;
    });

    return getById(parcelId);
}

// A registered customer books online. Sender details default to the
// customer's own account when not supplied.
async function bookByCustomer(data) {
    const customerId = parseId(data.customerId, 'customerId');

    const customer = await Customer.findByPk(customerId, { include: [{ model: User, as: 'user' }] });
    if (!customer) throw notFound(`Customer not found with id: ${customerId}`);

    const { fields, originStation } = await prepareParcelFields(data);

    return saveNewParcel({
        ...fields,
        senderName: firstNonBlank(data.senderName, customer.user && customer.user.name) || '',
        senderPhone: firstNonBlank(data.senderPhone, customer.user && customer.user.phone) || '',
        senderAddress: firstNonBlank(data.senderAddress, customer.address) || '',
        customerId: customer.id,
        bookingSource: BookingSource.ONLINE
    }, originStation, 'Parcel booked successfully');
}

// ─────────────────────────────────────────────────────────────
// Lifecycle: cancel -> assign -> pickup -> status updates
// ─────────────────────────────────────────────────────────────

// Adds one history row inside an open transaction.
const addHistory = (t, parcelId, { status, note, location, performedByRiderId = null }) =>
    ParcelHistory.create({ parcelId, status, note, location, performedByRiderId }, { transaction: t });

const originLabel = (parcel, suffix = '') =>
    parcel.originPoliceStation ? `${parcel.originPoliceStation.name}${suffix}` : '';

// The customer who booked it may cancel, but only while it is still PENDING.
async function cancel(parcelId, customerIdRaw) {
    const customerId = parseId(customerIdRaw, 'customerId');
    const parcel = await getById(parcelId);

    if (parcel.customerId !== customerId) {
        throw forbidden('You can only cancel your own parcels');
    }
    if (parcel.status !== ParcelStatus.PENDING) {
        throw conflict(`Cannot cancel — status is: ${parcel.status}. Only PENDING parcels can be cancelled.`);
    }

    await sequelize.transaction(async (t) => {
        await parcel.update({ status: ParcelStatus.CANCELLED }, { transaction: t });
        await addHistory(t, parcel.id, {
            status: ParcelStatus.CANCELLED,
            note: 'Cancelled by customer',
            location: originLabel(parcel)
        });
    });

    return getById(parcelId);
}

// Admin assigns (or re-assigns) a rider.
async function assignRider(parcelId, riderIdRaw) {
    const riderId = parseId(riderIdRaw, 'riderId');
    const parcel = await getById(parcelId);

    const rider = await Rider.findByPk(riderId, { include: [{ model: User, as: 'user' }] });
    if (!rider) throw notFound('Rider not found');

    if (!rider.active) {
        throw conflict('Rider is not active and cannot be assigned parcels');
    }
    // Re-assigning a parcel that is already on the road would wrongly reset it
    // back to ASSIGNED, so only these two states are allowed.
    if (![ParcelStatus.PENDING, ParcelStatus.ASSIGNED].includes(parcel.status)) {
        throw conflict(`Cannot assign a rider to a parcel that is ${parcel.status}`);
    }

    await sequelize.transaction(async (t) => {
        await parcel.update({ riderId: rider.id, status: ParcelStatus.ASSIGNED }, { transaction: t });
        await addHistory(t, parcel.id, {
            status: ParcelStatus.ASSIGNED,
            note: `Assigned to rider ${rider.user ? rider.user.name : rider.id} — awaiting pickup`,
            location: originLabel(parcel, ' Hub') || 'Hub',
            performedByRiderId: rider.id
        });
    });

    return getById(parcelId);
}

// The assigned rider confirms pickup from the sender (ASSIGNED -> PICKED_UP).
async function pickup(parcelId, { riderId: riderIdRaw, note, location }) {
    const riderId = parseId(riderIdRaw, 'riderId');
    const parcel = await getById(parcelId);

    if (parcel.riderId !== riderId) {
        throw forbidden('This parcel is not assigned to you');
    }
    if (parcel.status !== ParcelStatus.ASSIGNED) {
        throw conflict(`Parcel cannot be picked up from status ${parcel.status}`);
    }

    await sequelize.transaction(async (t) => {
        await parcel.update({ status: ParcelStatus.PICKED_UP }, { transaction: t });
        await addHistory(t, parcel.id, {
            status: ParcelStatus.PICKED_UP,
            note: firstNonBlank(note) || 'Picked up from sender',
            location: firstNonBlank(location) || originLabel(parcel, ' Hub') || 'Hub',
            performedByRiderId: riderId
        });
    });

    return getById(parcelId);
}

// Moves a parcel to any valid status and records it in the history.
//  - With riderId (a rider doing the update): that rider must be the assigned
//    one, and the parcel must not already be finished.
//  - Without riderId (admin): no such restriction.
//  - nextHubPoliceStationId (optional): records which hub the parcel is at now.
//  - DELIVERED on a COD parcel automatically marks payment as PAID.
async function updateStatus(parcelId, dto) {
    const newStatus = parseEnum(dto.status, ParcelStatus, 'status');
    const parcel = await getById(parcelId);

    const riderId = parseOptionalId(dto.riderId, 'riderId');
    if (riderId !== null) {
        if (parcel.riderId !== riderId) {
            throw forbidden('This parcel is not assigned to you');
        }
        if (TERMINAL_STATUSES.includes(parcel.status)) {
            throw conflict(`Parcel is already ${parcel.status} and cannot be updated further`);
        }
    }

    const hubId = parseOptionalId(dto.nextHubPoliceStationId, 'nextHubPoliceStationId');
    const hub = hubId ? await requireStation(hubId, 'Hub police station') : null;

    const changes = { status: newStatus };
    if (hub) changes.currentHubId = hub.id;
    if (newStatus === ParcelStatus.DELIVERED && parcel.paymentMethod === PaymentMethod.COD) {
        changes.paymentStatus = PaymentStatus.PAID;
    }

    await sequelize.transaction(async (t) => {
        await parcel.update(changes, { transaction: t });
        await addHistory(t, parcel.id, {
            status: newStatus,
            note: firstNonBlank(dto.note) || 'Status updated',
            location: firstNonBlank(dto.location) || (hub ? `${hub.name} Hub` : ''),
            performedByRiderId: riderId
        });
    });

    return getById(parcelId);
}

// Deleting a parcel also deletes its history (ON DELETE CASCADE).
async function remove(id) {
    const deleted = await Parcel.destroy({ where: { id } });
    if (deleted === 0) throw notFound('Parcel not found');
}

module.exports = {
    getAll,
    getById,
    getByCustomer,
    getByRider,
    getPendingUnassigned,
    track,
    previewCharge,
    bookByCustomer,
    cancel,
    assignRider,
    pickup,
    updateStatus,
    remove
};