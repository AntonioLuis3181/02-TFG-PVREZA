// routes/auth.routes.js
const express = require('express');
const router = express.Router();

// POST /api/auth/register -> Crear nueva cuenta
router.post('/register', (req, res) => {
    res.json({ mensaje: 'Ruta de registro preparada' });
});

// POST /api/auth/login -> Iniciar sesión
router.post('/login', (req, res) => {
    res.json({ mensaje: 'Ruta de login preparada' });
});

module.exports = router;