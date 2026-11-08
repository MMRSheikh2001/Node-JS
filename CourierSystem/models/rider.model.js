const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const User = require('./user.model');
const PoliceStation = require('./police-station.model');

const Rider = sequelize.define('Rider', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    vehicleType: {
        type: DataTypes.STRING, // e.g. Bike, Bicycle, Van
        allowNull: true
    },
    vehicleNumber: {
        type: DataTypes.STRING,
        allowNull: true
    },
    nidNumber: {
        type: DataTypes.STRING,
        allowNull: true
    },
    rating: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        defaultValue: 0
    },
    totalDeliveries: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    totalEarnings: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        defaultValue: 0
    },
    active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },
    image: {
        type: DataTypes.STRING, // /uploads/rider/<filename>
        allowNull: true
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true // 1-to-1 with User, same pattern as Customer/Agent
    }
}, {
    tableName: 'riders',
    timestamps: true
});

// 1-to-1: a Rider belongs to exactly one User (their auth account).
Rider.belongsTo(User, { foreignKey: 'userId', as: 'user' });
User.hasOne(Rider, { foreignKey: 'userId', as: 'rider' });

// Many-to-many: a Rider covers many zones (PoliceStations) and a PoliceStation
// can be covered by many Riders. `through: 'rider_zones'` makes Sequelize create
// and manage the join table itself — the equivalent of Java's @ManyToMany +
// @JoinTable(name = "rider_zones").
Rider.belongsToMany(PoliceStation, {
    through: 'rider_zones',
    as: 'zones',
    foreignKey: 'riderId',
    otherKey: 'policeStationId'
});
PoliceStation.belongsToMany(Rider, {
    through: 'rider_zones',
    as: 'riders',
    foreignKey: 'policeStationId',
    otherKey: 'riderId'
});

module.exports = Rider;