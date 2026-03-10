const db = require('../db/database');
const Product = require('../models/product.model');

class ProductRepository {
  getAll({ search, category, minPrice, maxPrice }) {
    let query = 'SELECT * FROM products WHERE 1=1';
    const params = [];

    if (search) {
      query += ' AND (name LIKE ? OR description LIKE ?)';
      params.push(`%${search}%`, `%${search}%`);
    }

    if (category) {
      query += ' AND category = ?';
      params.push(category);
    }

    if (minPrice !== undefined) {
      query += ' AND price >= ?';
      params.push(minPrice);
    }

    if (maxPrice !== undefined) {
      query += ' AND price <= ?';
      params.push(maxPrice);
    }

    const rows = db.prepare(query).all(...params);
    return rows.map(row => new Product(row));
  }

  getById(id) {
    const row = db.prepare('SELECT * FROM products WHERE id = ?').get(id);
    return row ? new Product(row) : null;
  }

  create({ name, description, price, category, stock }) {
    const stmt = db.prepare(`
      INSERT INTO products (name, description, price, category, stock)
      VALUES (?, ?, ?, ?, ?)
    `);
    const result = stmt.run(name, description, price, category, stock ?? 0);
    return this.getById(result.lastInsertRowid);
  }

  update(id, { name, description, price, category, stock }) {
    const stmt = db.prepare(`
      UPDATE products
      SET name = ?, description = ?, price = ?, category = ?, stock = ?
      WHERE id = ?
    `);
    stmt.run(name, description, price, category, stock, id);
    return this.getById(id);
  }

  delete(id) {
    db.prepare('DELETE FROM products WHERE id = ?').run(id);
    return { message: 'Товар удалён' };
  }
}

module.exports = new ProductRepository();