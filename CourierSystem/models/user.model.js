const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const PoliceStation = require('./police-station.model');

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.ENUM('RIDER', 'CUSTOMER', 'AGENT', 'ADMIN'),
        allowNull: false
    },
    active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },
    policeStationId: {
        type: DataTypes.INTEGER,
        allowNull: true
    }
}, {
    tableName: 'users',
    timestamps: true
});


User.belongsTo(PoliceStation, { foreignKey: 'policeStationId', as: 'policeStation' });
PoliceStation.hasMany(User, { foreignKey: 'policeStationId', as: 'users' });

module.exports = User;