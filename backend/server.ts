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

// Rutas API sin prefijo /api (deben ir ANTES del static)
app.use('/users', userRoutes);
app.use('/posts', postRoutes);
app.use('/todos', todoRoutes);

// Servir archivos estáticos del frontend compilado
const frontendDistPath = path.join(__dirname, '..', 'frontend', 'dist');

// Verificar si existe el directorio dist
if (!fs.existsSync(frontendDistPath)) {
    console.warn('⚠️  ADVERTENCIA: El directorio frontend/dist no existe.');
    console.warn('   Ejecuta "npm run frontend:build" para compilar el frontend.');
}

app.use(express.static(frontendDistPath));

// Ruta raíz (sirve la SPA compilada)
app.get('/', (req: Request, res: Response) => {
    const indexPath = path.join(frontendDistPath, 'index.html');
    if (fs.existsSync(indexPath)) {
        res.sendFile(indexPath);
    } else {
        res.status(503).send(`
            <html>
                <head><title>Frontend no compilado</title></head>
                <body>
                    <h1>⚠️ Frontend no compilado</h1>
                    <p>El directorio <code>frontend/dist</code> no existe.</p>
                    <p>Por favor, ejecuta: <code>npm run frontend:build</code></p>
                </body>
            </html>
        `);
    }
});

// Manejo de errores
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Algo salió mal!' });
});

// Iniciar servidor
app.listen(PORT, async () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    console.log(`📊 Conectando a: ${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`);
    
    // Probar conexión a la base de datos
    try {
        await db.query('SELECT NOW()');
        console.log('✅ Conexión a PostgreSQL establecida');
    } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        console.error('❌ Error al conectar con PostgreSQL:', message);
        console.error('💡 Verifica que el contenedor Docker esté corriendo');
    }
});

export default app;


