

const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const User = require('./user.model');
const PoliceStation = require('./police-station.model');

const Agent = sequelize.define('Agent', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    designation: {
        type: DataTypes.STRING,
        allowNull: true
    },
    image: {
        type: DataTypes.STRING,
        allowNull: true
    },
    active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true
    },
    hubId: {
        type: DataTypes.INTEGER,
        allowNull: false

    }
}, {
    tableName: 'agents',
    timestamps: true
});


Agent.belongsTo(User, { foreignKey: 'userId', as: 'user' });
User.hasOne(Agent, { foreignKey: 'userId', as: 'agent' });


Agent.belongsTo(PoliceStation, { foreignKey: 'hubId', as: 'hub' });
PoliceStation.hasMany(Agent, { foreignKey: 'hubId', as: 'agents' });

module.exports = Agent;