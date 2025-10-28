const { Pool } = require('pg');
require('dotenv').config();

// Configurar objeto de conexión
const dbConfig = {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    database: process.env.DB_NAME || 'imageproject_db',
    user: process.env.DB_USER || 'postgres',
};

// Solo agregar password si está definido y no es vacío
if (process.env.DB_PASSWORD) {
    const password = process.env.DB_PASSWORD.trim();
    if (password !== '') {
        dbConfig.password = password;
    }
}

// Usar autenticación sin contraseña si no se especifica
const pool = new Pool(dbConfig);

async function initDatabase() {
    try {
        console.log('🔄 Inicializando base de datos...');

        // Crear tabla de usuarios
        await pool.query(`
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                email VARCHAR(255) UNIQUE NOT NULL,
                phone VARCHAR(50),
                city VARCHAR(100),
                company VARCHAR(255)
            )
        `);
        console.log('✅ Tabla "users" creada');

        // Crear tabla de publicaciones
        await pool.query(`
            CREATE TABLE IF NOT EXISTS posts (
                id SERIAL PRIMARY KEY,
                title VARCHAR(500) NOT NULL,
                body TEXT,
                user_id INTEGER REFERENCES users(id)
            )
        `);
        console.log('✅ Tabla "posts" creada');

        // Crear tabla de tareas
        await pool.query(`
            CREATE TABLE IF NOT EXISTS todos (
                id SERIAL PRIMARY KEY,
                title VARCHAR(500) NOT NULL,
                completed BOOLEAN DEFAULT FALSE
            )
        `);
        console.log('✅ Tabla "todos" creada');

        // Insertar datos de ejemplo si las tablas están vacías
        const usersCount = await pool.query('SELECT COUNT(*) FROM users');
        if (parseInt(usersCount.rows[0].count) === 0) {
            console.log('📝 Insertando datos de ejemplo...');
            
            await pool.query(`
                INSERT INTO users (name, email, phone, city, company) VALUES
                ('Juan Pérez', 'juan@example.com', '555-0101', 'Madrid', 'Tech Corp'),
                ('María García', 'maria@example.com', '555-0102', 'Barcelona', 'Design Studio'),
                ('Carlos López', 'carlos@example.com', '555-0103', 'Valencia', 'Dev Solutions')
            `);
            
            await pool.query(`
                INSERT INTO posts (title, body, user_id) VALUES
                ('Bienvenido al blog', 'Este es mi primer post sobre tecnología', 1),
                ('Desarrollo web moderno', 'Aprende las últimas tendencias en desarrollo', 1),
                ('Diseño de interfaces', 'Consejos para crear diseños hermosos', 2)
            `);
            
            await pool.query(`
                INSERT INTO todos (title, completed) VALUES
                ('Aprender Node.js', true),
                ('Conectar con PostgreSQL', false),
                ('Crear API REST', false),
                ('Mejorar el diseño', true)
            `);
            
            console.log('✅ Datos de ejemplo insertados');
        }

        console.log('🎉 Base de datos inicializada correctamente');
    } catch (error) {
        console.error('❌ Error al inicializar la base de datos:', error);
        process.exit(1);
    } finally {
        await pool.end();
    }
}

initDatabase();

