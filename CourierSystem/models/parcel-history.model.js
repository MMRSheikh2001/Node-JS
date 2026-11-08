const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const Parcel = require('./parcel.model');
const Rider = require('./rider.model');

// One row per step in a parcel's journey (booked, assigned, picked up, ...).
// This is the data behind the public "track my parcel" timeline.
const ParcelHistory = sequelize.define('ParcelHistory', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    status: {
        type: DataTypes.STRING, // a ParcelStatus value, stored as plain text like the Java version
        allowNull: false
    },
    note: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    location: {
        type: DataTypes.STRING,
        allowNull: true
    },
    parcelId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    performedByRiderId: {
        type: DataTypes.INTEGER,
        allowNull: true // some steps (booking, cancel, admin updates) have no rider
    }
}, {
    tableName: 'parcel_history',
    timestamps: true,
    updatedAt: false // history rows are never edited, so only createdAt is kept
});

// Deleting a parcel deletes its history (Java: cascade = ALL + orphanRemoval).
Parcel.hasMany(ParcelHistory, { foreignKey: 'parcelId', as: 'history', onDelete: 'CASCADE' });
ParcelHistory.belongsTo(Parcel, { foreignKey: 'parcelId', as: 'parcel' });

ParcelHistory.belongsTo(Rider, { foreignKey: 'performedByRiderId', as: 'performedBy' });
Rider.hasMany(ParcelHistory, { foreignKey: 'performedByRiderId', as: 'performedHistory' });

module.exports = ParcelHistory;