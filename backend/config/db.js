// config/db.js
// MySQL connection pool using mysql2/promise

const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host:     process.env.DB_HOST,
  port:     process.env.DB_PORT,
  user:     process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl:{
    rejectUnauthorized: false
  },
  waitForConnections: true,
  connectionLimit:    10,
  queueLimit:         0,
});

// Test the connection on startup
async function testConnection() {
  try {
    const conn = await pool.getConnection();
    console.log('✅  MySQL connected successfully to database:', process.env.DB_NAME || 'intelliquiz');
    conn.release();
  } catch (err) {
    console.error('❌  MySQL connection failed:', err.message);
    console.error('    Make sure XAMPP MySQL is running and the database exists.');
    process.exit(1);
  }
}

module.exports = { pool, testConnection };
