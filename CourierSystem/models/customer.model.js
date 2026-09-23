const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const User = require('./user.model');
const PoliceStation = require('./police-station.model');

const Customer = sequelize.define('Customer', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    address: {
        type: DataTypes.STRING,
        allowNull: true
    },
    gender: {
        type: DataTypes.STRING,
        allowNull: true
    },
    dob: {
        type: DataTypes.DATEONLY,
        allowNull: true
    },
    image: {
        type: DataTypes.STRING,
        allowNull: true
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true
    },
    policeStationId: {
        type: DataTypes.INTEGER,
        allowNull: true
    }
}, {
    tableName: 'customers',
    timestamps: true
});


Customer.belongsTo(User, { foreignKey: 'userId', as: 'user' });
User.hasOne(Customer, { foreignKey: 'userId', as: 'customer' });


Customer.belongsTo(PoliceStation, { foreignKey: 'policeStationId', as: 'policeStation' });
PoliceStation.hasMany(Customer, { foreignKey: 'policeStationId', as: 'customers' });

module.exports = Customer;