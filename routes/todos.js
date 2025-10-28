const express = require('express');
const router = express.Router();
const db = require('../config/database');

// GET - Obtener todas las tareas
router.get('/', async (req, res) => {
    try {
        const result = await db.query(
            'SELECT id, title, completed FROM todos ORDER BY id ASC'
        );
        res.json(result.rows);
    } catch (error) {
        console.error('Error al obtener tareas:', error);
        res.status(500).json({ error: 'Error al obtener tareas' });
    }
});

// GET - Obtener una tarea por ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await db.query(
            'SELECT id, title, completed FROM todos WHERE id = $1',
            [id]
        );
        
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Tarea no encontrada' });
        }
        
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error al obtener tarea:', error);
        res.status(500).json({ error: 'Error al obtener tarea' });
    }
});

// POST - Crear una nueva tarea
router.post('/', async (req, res) => {
    try {
        const { title, completed } = req.body;
        
        const result = await db.query(
            'INSERT INTO todos (title, completed) VALUES ($1, $2) RETURNING *',
            [title, completed || false]
        );
        
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error al crear tarea:', error);
        res.status(500).json({ error: 'Error al crear tarea' });
    }
});

// PATCH - Actualizar el estado de una tarea
router.patch('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { completed } = req.body;
        
        const result = await db.query(
            'UPDATE todos SET completed = $1 WHERE id = $2 RETURNING *',
            [completed, id]
        );
        
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Tarea no encontrada' });
        }
        
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error al actualizar tarea:', error);
        res.status(500).json({ error: 'Error al actualizar tarea' });
    }
});

module.exports = router;

