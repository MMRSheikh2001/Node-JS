const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const Division = require('./division.model');

const District = sequelize.define('District', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    districtCode: {
        type: DataTypes.STRING,
        allowNull: true
    },
    active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },
    divisionId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'districts',
    timestamps: true
});


District.belongsTo(Division, { foreignKey: 'divisionId', as: 'division' });
Division.hasMany(District, { foreignKey: 'divisionId', as: 'districts' });

module.exports = District;