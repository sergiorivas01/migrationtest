"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const database_1 = __importDefault(require("../config/database"));
const router = (0, express_1.Router)();
// GET - Get all posts
router.get('/', async (req, res) => {
    try {
        const result = await database_1.default.query('SELECT id, title, body, user_id FROM posts ORDER BY id ASC');
        res.json(result.rows);
    }
    catch (error) {
        console.error('Error fetching posts:', error);
        res.status(500).json({ error: 'Error fetching posts' });
    }
});
// GET - Get post by ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await database_1.default.query('SELECT id, title, body, user_id FROM posts WHERE id = $1', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Post not found' });
        }
        res.json(result.rows[0]);
    }
    catch (error) {
        console.error('Error fetching post:', error);
        res.status(500).json({ error: 'Error fetching post' });
    }
});
// POST - Create new post
router.post('/', async (req, res) => {
    try {
        const { title, body, user_id } = req.body;
        const result = await database_1.default.query('INSERT INTO posts (title, body, user_id) VALUES ($1, $2, $3) RETURNING *', [title, body, user_id]);
        res.status(201).json(result.rows[0]);
    }
    catch (error) {
        console.error('Error creating post:', error);
        res.status(500).json({ error: 'Error creating post' });
    }
});
exports.default = router;
