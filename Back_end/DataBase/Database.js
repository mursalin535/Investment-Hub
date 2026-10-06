require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });

const mysql = require('mysql2');

const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 3306,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'investment_hub',
    waitForConnections: true,
    connectionLimit: Number(process.env.DB_CONNECTION_LIMIT) || 10
});

module.exports = pool.promise();
