"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// Configure connection object
const dbConfig = {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 5432,
    database: process.env.DB_NAME || 'imageproject_db',
    user: process.env.DB_USER || 'postgres',
};
// Add password only if defined and non-empty
if (process.env.DB_PASSWORD) {
    const password = process.env.DB_PASSWORD.trim();
    if (password !== '') {
        dbConfig.password = password;
    }
}
// Use passwordless auth if not provided
const pool = new pg_1.Pool(dbConfig);
async function initDatabase() {
    try {
        console.log('🔄 Initializing database...');
        // Create users table
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
        console.log('✅ Table "users" created');
        // Create posts table
        await pool.query(`
            CREATE TABLE IF NOT EXISTS posts (
                id SERIAL PRIMARY KEY,
                title VARCHAR(500) NOT NULL,
                body TEXT,
                user_id INTEGER REFERENCES users(id)
            )
        `);
        console.log('✅ Table "posts" created');
        // Create todos table
        await pool.query(`
            CREATE TABLE IF NOT EXISTS todos (
                id SERIAL PRIMARY KEY,
                title VARCHAR(500) NOT NULL,
                completed BOOLEAN DEFAULT FALSE
            )
        `);
        console.log('✅ Table "todos" created');
        // Seed sample data if tables are empty
        const usersCount = await pool.query('SELECT COUNT(*) FROM users');
        if (parseInt(usersCount.rows[0].count, 10) === 0) {
            console.log('📝 Inserting sample data...');
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
            console.log('✅ Sample data inserted');
        }
        console.log('🎉 Database initialized successfully');
    }
    catch (error) {
        console.error('❌ Error initializing database:', error);
        process.exit(1);
    }
    finally {
        await pool.end();
    }
}
void initDatabase();
