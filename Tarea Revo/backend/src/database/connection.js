const sql = require('mssql');
require('dotenv').config();

const dbSettings = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_DATABASE,
  port: parseInt(process.env.DB_PORT || 1433),
  options: {
    encrypt: true, // true para azure
    trustServerCertificate: true, // true para desarrollo local
  },
};

const getConnection = async () => {
  try {
    const pool = await sql.connect(dbSettings);
    return pool;
  } catch (error) {
    console.error('Error conectando a la base de datos:', error);
    throw error;
  }
};

module.exports = { getConnection, sql };
