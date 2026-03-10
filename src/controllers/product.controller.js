const productService = require('../services/product.service');

class ProductController {
  getAll = (req, res) => {
    try {
      const { search, category, minPrice, maxPrice } = req.query;
      const filters = {
        search,
        category,
        minPrice: minPrice !== undefined ? Number(minPrice) : undefined,
        maxPrice: maxPrice !== undefined ? Number(maxPrice) : undefined,
      };
      const products = productService.getAllProducts(filters);
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  getById = (req, res) => {
    try {
      const product = productService.getProductById(Number(req.params.id));
      res.json(product);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  create = (req, res) => {
    try {
      const product = productService.createProduct(req.body);
      res.status(201).json(product);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  update = (req, res) => {
    try {
      const product = productService.updateProduct(Number(req.params.id), req.body);
      res.json(product);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  delete = (req, res) => {
    try {
      const result = productService.deleteProduct(Number(req.params.id));
      res.json(result);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }
}

module.exports = new ProductController();