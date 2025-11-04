import { Router, Request, Response } from 'express';
import db from '../config/database';

const router = Router();

// GET - Get all todos
router.get('/', async (req: Request, res: Response) => {
    try {
        const result = await db.query(
            'SELECT id, title, completed FROM todos ORDER BY id ASC'
        );
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching todos:', error);
        res.status(500).json({ error: 'Error fetching todos' });
    }
});

// GET - Get todo by ID
router.get('/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params as { id: string };
        const result = await db.query(
            'SELECT id, title, completed FROM todos WHERE id = $1',
            [id]
        );
        
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Todo not found' });
        }
        
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error fetching todo:', error);
        res.status(500).json({ error: 'Error fetching todo' });
    }
});

// POST - Create new todo
router.post('/', async (req: Request, res: Response) => {
    try {
        const { title, completed } = req.body as { title: string; completed?: boolean };
        
        const result = await db.query(
            'INSERT INTO todos (title, completed) VALUES ($1, $2) RETURNING *',
            [title, completed || false]
        );
        
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error creating todo:', error);
        res.status(500).json({ error: 'Error creating todo' });
    }
});

// PATCH - Update todo status
router.patch('/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params as { id: string };
        const { completed } = req.body as { completed: boolean };
        
        const result = await db.query(
            'UPDATE todos SET completed = $1 WHERE id = $2 RETURNING *',
            [completed, id]
        );
        
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Todo not found' });
        }
        
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error updating todo:', error);
        res.status(500).json({ error: 'Error updating todo' });
    }
});

export default router;


