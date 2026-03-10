const productRepository = require('../repositories/product.repository');

class ProductService {
  getAllProducts(filters) {
    return productRepository.getAll(filters);
  }

  getProductById(id) {
    const product = productRepository.getById(id);
    if (!product) {
      throw new Error('Товар не найден');
    }
    return product;
  }

  createProduct(data) {
    if (!data.name || !data.price) {
      throw new Error('Название и цена обязательны');
    }
    if (data.price < 0) {
      throw new Error('Цена не может быть отрицательной');
    }
    return productRepository.create(data);
  }

  updateProduct(id, data) {
    this.getProductById(id); // проверяем что товар существует
    if (data.price !== undefined && data.price < 0) {
      throw new Error('Цена не может быть отрицательной');
    }
    return productRepository.update(id, data);
  }

  deleteProduct(id) {
    this.getProductById(id); // проверяем что товар существует
    return productRepository.delete(id);
  }
}

module.exports = new ProductService();