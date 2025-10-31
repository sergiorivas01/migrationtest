const express = require('express');
const path = require('path');
const cors = require('cors');
require('dotenv').config();

const db = require('./config/database');
const userRoutes = require('./routes/users');
const postRoutes = require('./routes/posts');
const todoRoutes = require('./routes/todos');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir archivos estáticos del frontend compilado
const frontendDistPath = path.join(__dirname, '..', 'frontend', 'dist');
const fs = require('fs');

// Verificar si existe el directorio dist
if (!fs.existsSync(frontendDistPath)) {
    console.warn('⚠️  ADVERTENCIA: El directorio frontend/dist no existe.');
    console.warn('   Ejecuta "npm run frontend:build" para compilar el frontend.');
}

app.use(express.static(frontendDistPath));

// Rutas API
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/todos', todoRoutes);

// Ruta raíz (sirve la SPA compilada)
app.get('/', (req, res) => {
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
app.use((err, req, res, next) => {
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
        console.error('❌ Error al conectar con PostgreSQL:', error.message);
        console.error('💡 Verifica que el contenedor Docker esté corriendo');
    }
});
