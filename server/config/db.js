const mysql = require('mysql2/promise');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

let dbType = process.env.DB_TYPE || 'sqlite'; // 'mysql' or 'sqlite'
let pool = null;
let sqliteDb = null;

// Promisified SQLite helpers
const sqliteRun = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    sqliteDb.run(sql, params, function (err) {
      if (err) reject(err);
      else resolve({ lastID: this.lastID, changes: this.changes, insertId: this.lastID });
    });
  });
};

const sqliteGet = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    sqliteDb.get(sql, params, (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });
};

const sqliteAll = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    sqliteDb.all(sql, params, (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
};

// Universal Query Abstraction layer for clean MySQL / SQLite dual support
const dbRun = async (sql, params = []) => {
  if (dbType === 'mysql' && pool) {
    // Convert SQLite AUTOINCREMENT or DATETIME syntax if needed
    let mysqlSql = sql
      .replace(/AUTOINCREMENT/gi, 'AUTO_INCREMENT')
      .replace(/DATETIME DEFAULT CURRENT_TIMESTAMP/gi, 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP');
    const [result] = await pool.execute(mysqlSql, params);
    return { lastID: result.insertId, insertId: result.insertId, changes: result.affectedRows };
  } else {
    return await sqliteRun(sql, params);
  }
};

const dbGet = async (sql, params = []) => {
  if (dbType === 'mysql' && pool) {
    const [rows] = await pool.execute(sql, params);
    return rows[0] || null;
  } else {
    return await sqliteGet(sql, params);
  }
};

const dbAll = async (sql, params = []) => {
  if (dbType === 'mysql' && pool) {
    const [rows] = await pool.execute(sql, params);
    return rows;
  } else {
    return await sqliteAll(sql, params);
  }
};

const initDatabase = async () => {
  const host = process.env.DB_HOST || 'localhost';
  const user = process.env.DB_USER || 'root';
  const password = process.env.DB_PASSWORD || '';
  const databaseName = process.env.DB_NAME || 'codealpha_ecommerce_db';
  const dbPort = parseInt(process.env.DB_PORT || '3306', 10);

  if (process.env.DB_TYPE === 'mysql') {
    try {
      console.log(`Connecting to MySQL Server at ${host}:${dbPort} as '${user}'...`);
      // Step 1: Create Database if not exists
      const tempConn = await mysql.createConnection({ host, port: dbPort, user, password });
      await tempConn.query(`CREATE DATABASE IF NOT EXISTS \`${databaseName}\`;`);
      await tempConn.end();

      // Step 2: Pool connection to target MySQL database
      pool = mysql.createPool({
        host,
        port: dbPort,
        user,
        password,
        database: databaseName,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
      });

      dbType = 'mysql';
      console.log(`✅ Connected to MySQL Database '${databaseName}' successfully!`);
    } catch (err) {
      console.log(`⚠️ MySQL Connection note: ${err.message}`);
      console.log(`To connect MySQL Workbench, set DB_PASSWORD in .env file.`);
      dbType = 'sqlite';
    }
  }

  if (dbType === 'sqlite') {
    const dbPath = path.resolve(__dirname, '../../', process.env.DB_FILE || 'ecommerce.sqlite');
    sqliteDb = new sqlite3.Database(dbPath);
    console.log(`✅ Connected to SQLite database at: ${dbPath}`);
  }

  // Initialize Schema Tables
  try {
    const pkType = dbType === 'mysql' ? 'INT PRIMARY KEY AUTO_INCREMENT' : 'INTEGER PRIMARY KEY AUTOINCREMENT';
    const timestampType = dbType === 'mysql' ? 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP' : 'DATETIME DEFAULT CURRENT_TIMESTAMP';

    // Users table
    await dbRun(`
      CREATE TABLE IF NOT EXISTS users (
        id ${pkType},
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        role VARCHAR(50) DEFAULT 'customer',
        created_at ${timestampType}
      )
    `);

    // Products table
    await dbRun(`
      CREATE TABLE IF NOT EXISTS products (
        id ${pkType},
        name VARCHAR(255) NOT NULL,
        category VARCHAR(100) NOT NULL,
        price DOUBLE NOT NULL,
        original_price DOUBLE,
        rating DOUBLE DEFAULT 4.5,
        review_count INT DEFAULT 12,
        stock INT DEFAULT 50,
        description TEXT,
        features TEXT,
        image TEXT,
        is_featured INT DEFAULT 0,
        created_at ${timestampType}
      )
    `);

    // Orders table
    await dbRun(`
      CREATE TABLE IF NOT EXISTS orders (
        id ${pkType},
        user_id INT NOT NULL,
        total_amount DOUBLE NOT NULL,
        status VARCHAR(50) DEFAULT 'Pending',
        shipping_name VARCHAR(255) NOT NULL,
        shipping_email VARCHAR(255) NOT NULL,
        shipping_address TEXT NOT NULL,
        shipping_city VARCHAR(100) NOT NULL,
        shipping_zip VARCHAR(50) NOT NULL,
        payment_method VARCHAR(100) DEFAULT 'Credit Card',
        created_at ${timestampType}
      )
    `);

    // Order Items table
    await dbRun(`
      CREATE TABLE IF NOT EXISTS order_items (
        id ${pkType},
        order_id INT NOT NULL,
        product_id INT NOT NULL,
        product_name VARCHAR(255) NOT NULL,
        price DOUBLE NOT NULL,
        quantity INT NOT NULL,
        image TEXT
      )
    `);

    console.log(`Database tables initialized in [${dbType.toUpperCase()}] mode.`);

    // Seed products if table is empty
    const productCountRow = await dbGet('SELECT COUNT(*) as count FROM products');
    if (productCountRow.count === 0) {
      const seedProducts = require('../utils/seedData');
      await seedProducts(dbRun);
    }
  } catch (error) {
    console.error('Failed to initialize database tables:', error);
  }
};

module.exports = {
  dbRun,
  dbGet,
  dbAll,
  initDatabase
};
