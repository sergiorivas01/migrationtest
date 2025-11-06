import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import cors from 'cors';
import fs from 'fs';
import dotenv from 'dotenv';
dotenv.config();

import db from './config/database';
import userRoutes from './routes/users';
import postRoutes from './routes/posts';
import todoRoutes from './routes/todos';

const app = express();
const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API routes without /api prefix (must be BEFORE static)
app.use('/users', userRoutes);
app.use('/posts', postRoutes);
app.use('/todos', todoRoutes);

// Serve compiled frontend static files
const frontendDistPath = path.join(__dirname, '..', 'frontend', 'dist');

// Warn if dist folder is missing
if (!fs.existsSync(frontendDistPath)) {
    console.warn('⚠️  WARNING: The frontend/dist directory does not exist.');
    console.warn('   Run "npm run frontend:build" to build the frontend.');
}

app.use(express.static(frontendDistPath));

// Root (serves the compiled SPA)
app.get('/', (req: Request, res: Response) => {
    const indexPath = path.join(frontendDistPath, 'index.html');
    if (fs.existsSync(indexPath)) {
        res.sendFile(indexPath);
    } else {
        res.status(503).send(`
            <html>
                <head><title>Frontend not built</title></head>
                <body>
                    <h1>⚠️ Frontend not built</h1>
                    <p>The <code>frontend/dist</code> directory does not exist.</p>
                    <p>Please run: <code>npm run frontend:build</code></p>
                </body>
            </html>
        `);
    }
});

// Manejo de errores
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

// Iniciar servidor
app.listen(PORT, async () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
    console.log(`📊 Connecting to Database`);
    
    // Probar conexión a la base de datos
    try {
        await db.query('SELECT NOW()');
        console.log('✅ PostgreSQL connection established');
    } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        console.error('❌ Error connecting to PostgreSQL:', message);
        console.error('💡 Make sure the Docker container is running');
    }
});

export default app;


