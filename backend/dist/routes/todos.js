"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const database_1 = __importDefault(require("../config/database"));
const router = (0, express_1.Router)();
// GET - Get all todos
router.get('/', async (req, res) => {
    try {
        const result = await database_1.default.query('SELECT id, title, completed FROM todos ORDER BY id ASC');
        res.json(result.rows);
    }
    catch (error) {
        console.error('Error fetching todos:', error);
        res.status(500).json({ error: 'Error fetching todos' });
    }
});
// GET - Get todo by ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await database_1.default.query('SELECT id, title, completed FROM todos WHERE id = $1', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Todo not found' });
        }
        res.json(result.rows[0]);
    }
    catch (error) {
        console.error('Error fetching todo:', error);
        res.status(500).json({ error: 'Error fetching todo' });
    }
});
// POST - Create new todo
router.post('/', async (req, res) => {
    try {
        const { title, completed } = req.body;
        const result = await database_1.default.query('INSERT INTO todos (title, completed) VALUES ($1, $2) RETURNING *', [title, completed || false]);
        res.status(201).json(result.rows[0]);
    }
    catch (error) {
        console.error('Error creating todo:', error);
        res.status(500).json({ error: 'Error creating todo' });
    }
});
// PATCH - Update todo status
router.patch('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { completed } = req.body;
        const result = await database_1.default.query('UPDATE todos SET completed = $1 WHERE id = $2 RETURNING *', [completed, id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Todo not found' });
        }
        res.json(result.rows[0]);
    }
    catch (error) {
        console.error('Error updating todo:', error);
        res.status(500).json({ error: 'Error updating todo' });
    }
});
exports.default = router;
