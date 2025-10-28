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

// Servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Rutas API
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/todos', todoRoutes);

// Ruta raíz
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
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

