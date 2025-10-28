const express = require('express');
const router = express.Router();
const db = require('../config/database');

// GET - Obtener todos los usuarios
router.get('/', async (req, res) => {
    try {
        const result = await db.query(
            'SELECT id, name, email, phone, city, company, created_at FROM users ORDER BY id ASC'
        );
        res.json(result.rows);
    } catch (error) {
        console.error('Error al obtener usuarios:', error);
        res.status(500).json({ error: 'Error al obtener usuarios' });
    }
});

// GET - Obtener un usuario por ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await db.query(
            'SELECT id, name, email, phone, city, company, created_at FROM users WHERE id = $1',
            [id]
        );
        
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error al obtener usuario:', error);
        res.status(500).json({ error: 'Error al obtener usuario' });
    }
});

// POST - Crear un nuevo usuario
router.post('/', async (req, res) => {
    try {
        const { name, email, phone, city, company } = req.body;
        
        const result = await db.query(
            'INSERT INTO users (name, email, phone, city, company) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [name, email, phone, city, company]
        );
        
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error al crear usuario:', error);
        res.status(500).json({ error: 'Error al crear usuario' });
    }
});

module.exports = router;

