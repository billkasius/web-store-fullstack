// Модель описывает структуру товара
class Product {
  constructor({ id, name, description, price, category, stock, created_at }) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.price = price;
    this.category = category;
    this.stock = stock;
    this.created_at = created_at;
  }
}

module.exports = Product;