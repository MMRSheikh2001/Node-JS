const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const District = require('./district.model');

const PoliceStation = sequelize.define('PoliceStation', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    postalCode: {
        type: DataTypes.STRING,
        allowNull: true
    },
    active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },
    districtId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'policestations',
    timestamps: true
});


PoliceStation.belongsTo(District, { foreignKey: 'districtId', as: 'district' });
District.hasMany(PoliceStation, { foreignKey: 'districtId', as: 'policeStations' });

module.exports = PoliceStation;