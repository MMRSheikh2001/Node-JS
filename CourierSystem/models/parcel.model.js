const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const PoliceStation = require('./police-station.model');
const Customer = require('./customer.model');
const Rider = require('./rider.model');
const Agent = require('./agent.model');
const {
    ParcelStatus,
    ParcelType,
    PaymentMethod,
    PaymentStatus,
    Priority,
    ServiceType,
    BookingSource
} = require('../utils/enums');

const Parcel = sequelize.define('Parcel', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    trackingCode: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: 'parcels_trackingCode_unique'
    },

    // ── Sender ──────────────────────────────────────────
    senderName: { type: DataTypes.STRING, allowNull: true },
    senderPhone: { type: DataTypes.STRING, allowNull: true },
    senderAddress: { type: DataTypes.STRING, allowNull: true },

    // ── Receiver ────────────────────────────────────────
    receiverName: { type: DataTypes.STRING, allowNull: false },
    receiverPhone: { type: DataTypes.STRING, allowNull: false },
    receiverAddress: { type: DataTypes.STRING, allowNull: false },

    // ── Parcel details ──────────────────────────────────
    weight: { type: DataTypes.DOUBLE, allowNull: false, defaultValue: 0.5 },
    description: { type: DataTypes.TEXT, allowNull: true },
    specialInstructions: { type: DataTypes.TEXT, allowNull: true },
    parcelType: { type: DataTypes.ENUM(...Object.values(ParcelType)), allowNull: true },

    // ── Service & pricing ───────────────────────────────
    serviceType: {
        type: DataTypes.ENUM(...Object.values(ServiceType)),
        allowNull: false,
        defaultValue: ServiceType.STANDARD
    },
    priority: {
        type: DataTypes.ENUM(...Object.values(Priority)),
        allowNull: false,
        defaultValue: Priority.NORMAL
    },
    deliveryCharge: { type: DataTypes.DOUBLE, allowNull: false, defaultValue: 0 },
    codAmount: { type: DataTypes.DOUBLE, allowNull: false, defaultValue: 0 },

    // ── Payment ─────────────────────────────────────────
    paymentMethod: {
        type: DataTypes.ENUM(...Object.values(PaymentMethod)),
        allowNull: false,
        defaultValue: PaymentMethod.COD
    },
    paymentStatus: {
        type: DataTypes.ENUM(...Object.values(PaymentStatus)),
        allowNull: false,
        defaultValue: PaymentStatus.PENDING
    },

    // ── Status ──────────────────────────────────────────
    status: {
        type: DataTypes.ENUM(...Object.values(ParcelStatus)),
        allowNull: false,
        defaultValue: ParcelStatus.PENDING
    },
    estimatedDelivery: { type: DataTypes.DATEONLY, allowNull: true },

    // Exactly one booker is set: customer (ONLINE) or bookedByAgent (AGENT).
    bookingSource: {
        type: DataTypes.ENUM(...Object.values(BookingSource)),
        allowNull: false,
        defaultValue: BookingSource.ONLINE
    },

    // ── Foreign keys (all optional at the DB level) ─────
    originPoliceStationId: { type: DataTypes.INTEGER, allowNull: true },
    destinationPoliceStationId: { type: DataTypes.INTEGER, allowNull: true },
    currentHubId: { type: DataTypes.INTEGER, allowNull: true }, // updates at every hub stop
    customerId: { type: DataTypes.INTEGER, allowNull: true },
    riderId: { type: DataTypes.INTEGER, allowNull: true },
    bookedByAgentId: { type: DataTypes.INTEGER, allowNull: true }
}, {
    tableName: 'parcels',
    timestamps: true // createdAt / updatedAt replace Java's @PrePersist / @PreUpdate
});

// Three different roles for PoliceStation, so each gets its own alias.
Parcel.belongsTo(PoliceStation, { foreignKey: 'originPoliceStationId', as: 'originPoliceStation' });
Parcel.belongsTo(PoliceStation, { foreignKey: 'destinationPoliceStationId', as: 'destinationPoliceStation' });
Parcel.belongsTo(PoliceStation, { foreignKey: 'currentHubId', as: 'currentHub' });

Parcel.belongsTo(Customer, { foreignKey: 'customerId', as: 'customer' });
Customer.hasMany(Parcel, { foreignKey: 'customerId', as: 'parcels' });

Parcel.belongsTo(Rider, { foreignKey: 'riderId', as: 'rider' });
Rider.hasMany(Parcel, { foreignKey: 'riderId', as: 'parcels' });

Parcel.belongsTo(Agent, { foreignKey: 'bookedByAgentId', as: 'bookedByAgent' });
Agent.hasMany(Parcel, { foreignKey: 'bookedByAgentId', as: 'bookedParcels' });

// ParcelHistory <-> Parcel is declared in parcel-history.model.js.

module.exports = Parcel;