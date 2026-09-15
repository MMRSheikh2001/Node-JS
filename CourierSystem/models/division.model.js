

const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const Country = require('./country.model');



const Division = sequelize.define('Division', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },

    active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },
    countryId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'divisions',
    timestamps: true
});


Division.belongsTo(Country, { foreignKey: 'countryId', as: 'country' });
Country.hasMany(Division, { foreignKey: 'countryId', as: 'divisions' });

module.exports = Division;