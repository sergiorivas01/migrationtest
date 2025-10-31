"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const database_1 = __importDefault(require("../config/database"));
const router = (0, express_1.Router)();
// GET - Obtener todas las publicaciones
router.get('/', async (req, res) => {
    try {
        const result = await database_1.default.query('SELECT id, title, body, user_id FROM posts ORDER BY id ASC');
        res.json(result.rows);
    }
    catch (error) {
        console.error('Error al obtener publicaciones:', error);
        res.status(500).json({ error: 'Error al obtener publicaciones' });
    }
});
// GET - Obtener una publicación por ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await database_1.default.query('SELECT id, title, body, user_id FROM posts WHERE id = $1', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Publicación no encontrada' });
        }
        res.json(result.rows[0]);
    }
    catch (error) {
        console.error('Error al obtener publicación:', error);
        res.status(500).json({ error: 'Error al obtener publicación' });
    }
});
// POST - Crear una nueva publicación
router.post('/', async (req, res) => {
    try {
        const { title, body, user_id } = req.body;
        const result = await database_1.default.query('INSERT INTO posts (title, body, user_id) VALUES ($1, $2, $3) RETURNING *', [title, body, user_id]);
        res.status(201).json(result.rows[0]);
    }
    catch (error) {
        console.error('Error al crear publicación:', error);
        res.status(500).json({ error: 'Error al crear publicación' });
    }
});
exports.default = router;
