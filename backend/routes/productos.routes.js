const express = require('express');
const router = express.Router();
const productosController = require('../controllers/productos.controller');

// GET /api/productos -> Devuelve todas las camisetas de PVREZA
router.get('/', productosController.obtenerProductos);

// GET /api/productos/:id -> Devuelve una camiseta específica (ej: /api/productos/1)
router.get('/:id', productosController.obtenerProductoPorId);

module.exports = router;