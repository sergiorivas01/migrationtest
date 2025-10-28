const express = require('express');
const router = express.Router();
const db = require('../config/database');

// GET - Obtener todas las publicaciones
router.get('/', async (req, res) => {
    try {
        const result = await db.query(
            'SELECT id, title, body, user_id FROM posts ORDER BY id ASC'
        );
        res.json(result.rows);
    } catch (error) {
        console.error('Error al obtener publicaciones:', error);
        res.status(500).json({ error: 'Error al obtener publicaciones' });
    }
});

// GET - Obtener una publicación por ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await db.query(
            'SELECT id, title, body, user_id FROM posts WHERE id = $1',
            [id]
        );
        
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Publicación no encontrada' });
        }
        
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error al obtener publicación:', error);
        res.status(500).json({ error: 'Error al obtener publicación' });
    }
});

// POST - Crear una nueva publicación
router.post('/', async (req, res) => {
    try {
        const { title, body, user_id } = req.body;
        
        const result = await db.query(
            'INSERT INTO posts (title, body, user_id) VALUES ($1, $2, $3) RETURNING *',
            [title, body, user_id]
        );
        
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error al crear publicación:', error);
        res.status(500).json({ error: 'Error al crear publicación' });
    }
});

module.exports = router;

