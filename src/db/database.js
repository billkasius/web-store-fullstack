const Database = require('better-sqlite3');
const path = require('path');

const db = new Database(path.join(__dirname, '../../products.db'));

// Создаём таблицы при первом запуске
db.exec(`
  CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT,
    price REAL NOT NULL,
    category TEXT,
    stock INTEGER DEFAULT 0,
    created_at TEXT DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    role TEXT DEFAULT 'user'
  );

  -- Создаём админа по умолчанию (пароль: admin123)
  INSERT OR IGNORE INTO users (username, password, role)
  VALUES ('admin', 'admin123', 'admin');
`);

module.exports = db;