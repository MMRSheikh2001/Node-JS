const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

// Defining this model is enough — Sequelize will CREATE TABLE automatically
// when sequelize.sync() runs in server.js. No manual SQL needed.

const Product = sequelize.define('Product', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
    defaultValue: 0
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  }
}, {
  tableName: 'products',
  timestamps: true // adds createdAt / updatedAt columns automatically
});

module.exports = Product;