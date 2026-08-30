const mysql = require('mysql2/promise');
const { Sequelize } = require('sequelize');
require('dotenv').config();


const {
  DB_HOST = '127.0.0.1',
  DB_PORT = 3306,
  DB_NAME = 'nodeapp',
  DB_USER = 'root',
  DB_PASSWORD = '1234'
} = process.env;

// Step 1: Ensure the database itself exists (Sequelize can't create the DB, only tables)
async function ensureDatabaseExists() {
  const connection = await mysql.createConnection({
    host: DB_HOST,
    port: DB_PORT,
    user: DB_USER,
    password: DB_PASSWORD
  });

  await connection.query(`CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\`;`);
  await connection.end();
  console.log(`Database "${DB_NAME}" is ready.`);
}


// Step 2: Create the Sequelize instance pointing at that database
const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  port: DB_PORT,
  dialect: 'mysql',
  logging: false
});

module.exports = { sequelize, ensureDatabaseExists };
