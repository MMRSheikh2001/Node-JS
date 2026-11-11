const { pickDefined } = require('../utils/pickDefined');

// What a client may send when booking a parcel (mirrors ParcelRequestDTO).
const BOOKING_FIELDS = [
    'customerId',
    'senderName', 'senderPhone', 'senderAddress', 'originPoliceStationId',
    'receiverName', 'receiverPhone', 'receiverAddress', 'destinationPoliceStationId',
    'parcelType', 'weight', 'description', 'specialInstructions',
    'serviceType', 'priority',
    'paymentMethod', 'codAmount'
];

// What a client may send to change a parcel's status (mirrors StatusUpdateRequestDTO).
const STATUS_UPDATE_FIELDS = ['status', 'note', 'location', 'riderId', 'nextHubPoliceStationId'];

function toParcelBookingRequestDTO(body) {
    return pickDefined(body, BOOKING_FIELDS);
}

// What an agent may send when booking at the hub counter. No customerId (the
// sender is a walk-in); the agent is identified by agentId instead.
const AGENT_BOOKING_FIELDS = [
    'agentId',
    'senderName', 'senderPhone', 'senderAddress', 'originPoliceStationId',
    'receiverName', 'receiverPhone', 'receiverAddress', 'destinationPoliceStationId',
    'parcelType', 'weight', 'description', 'specialInstructions',
    'serviceType', 'priority',
    'paymentMethod', 'codAmount'
];

function toAgentParcelBookingRequestDTO(body) {
    return pickDefined(body, AGENT_BOOKING_FIELDS);
}

function toStatusUpdateRequestDTO(body) {
    return pickDefined(body, STATUS_UPDATE_FIELDS);
}

// PoliceStation -> { name, district, division } with safe handling of missing links.
function describeStation(station) {
    const district = station ? station.district : null;
    const division = district ? district.division : null;
    return {
        id: station ? station.id : undefined,
        name: station ? station.name : undefined,
        district: district ? district.name : undefined,
        division: division ? division.name : undefined
    };
}

// Flattens one Parcel (loaded with PARCEL_INCLUDE from parcel.service.js)
// into the shape the client sees, like the Java ParcelResponseDTO.
function toParcelResponseDTO(parcel) {
    const origin = describeStation(parcel.originPoliceStation);
    const destination = describeStation(parcel.destinationPoliceStation);
    const currentHub = describeStation(parcel.currentHub);

    const customer = parcel.customer;
    const customerUser = customer ? customer.user : null;
    const rider = parcel.rider;
    const riderUser = rider ? rider.user : null;
    const agent = parcel.bookedByAgent;
    const agentUser = agent ? agent.user : null;

    // History ids grow over time, so sorting by id puts the timeline in order
    // (createdAt only has 1-second resolution, so several steps can tie).
    const history = (Array.isArray(parcel.history) ? [...parcel.history] : [])
        .sort((a, b) => a.id - b.id)
        .map((h) => ({
            id: h.id,
            status: h.status,
            note: h.note,
            location: h.location,
            timestamp: h.createdAt,
            performedBy: h.performedBy && h.performedBy.user ? h.performedBy.user.name : undefined,
            riderId: h.performedByRiderId
        }));

    return {
        id: parcel.id,
        trackingCode: parcel.trackingCode,

        senderName: parcel.senderName,
        senderPhone: parcel.senderPhone,
        senderAddress: parcel.senderAddress,
        originPoliceStationId: origin.id,
        originPoliceStation: origin.name,
        originDistrict: origin.district,
        originDivision: origin.division,

        receiverName: parcel.receiverName,
        receiverPhone: parcel.receiverPhone,
        receiverAddress: parcel.receiverAddress,
        destinationPoliceStationId: destination.id,
        destinationPoliceStation: destination.name,
        destinationDistrict: destination.district,
        destinationDivision: destination.division,

        currentHubId: currentHub.id,
        currentHubName: currentHub.name,

        parcelType: parcel.parcelType,
        weight: parcel.weight,
        description: parcel.description,
        specialInstructions: parcel.specialInstructions,

        serviceType: parcel.serviceType,
        priority: parcel.priority,
        deliveryCharge: parcel.deliveryCharge,
        codAmount: parcel.codAmount,

        paymentMethod: parcel.paymentMethod,
        paymentStatus: parcel.paymentStatus,

        status: parcel.status,
        estimatedDelivery: parcel.estimatedDelivery,
        bookingSource: parcel.bookingSource,
        createdAt: parcel.createdAt,
        updatedAt: parcel.updatedAt,

        customerId: parcel.customerId,
        customerName: customerUser ? customerUser.name : undefined,
        customerPhone: customerUser ? customerUser.phone : undefined,

        riderId: parcel.riderId,
        riderName: riderUser ? riderUser.name : undefined,
        riderPhone: riderUser ? riderUser.phone : undefined,

        agentId: parcel.bookedByAgentId,
        agentName: agentUser ? agentUser.name : undefined,
        agentHubName: agent && agent.hub ? agent.hub.name : undefined,

        history
    };
}

module.exports = {
    toParcelBookingRequestDTO,
    toAgentParcelBookingRequestDTO,
    toStatusUpdateRequestDTO,
    toParcelResponseDTO
};