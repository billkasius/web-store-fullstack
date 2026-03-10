const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');
const authMiddleware = require('../middleware/auth.middleware');

// Публичные маршруты — доступны всем
router.get('/', productController.getAll);
router.get('/:id', productController.getById);

// Защищённые маршруты — только для админа
router.post('/', authMiddleware, productController.create);
router.put('/:id', authMiddleware, productController.update);
router.delete('/:id', authMiddleware, productController.delete);

module.exports = router;