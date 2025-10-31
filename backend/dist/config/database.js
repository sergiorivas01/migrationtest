"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
// Configurar objeto de conexión
const dbConfig = {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 5432,
    database: process.env.DB_NAME || 'imageproject_db',
    user: process.env.DB_USER || 'postgres',
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
};
// Solo agregar password si está definido
if (process.env.DB_PASSWORD && process.env.DB_PASSWORD.trim() !== '') {
    dbConfig.password = process.env.DB_PASSWORD;
}
const pool = new pg_1.Pool(dbConfig);
// Event listeners para depuración
pool.on('connect', () => {
    console.log('🔌 Nueva conexión establecida con PostgreSQL');
});
pool.on('error', (err) => {
    console.error('❌ Error inesperado en el cliente PostgreSQL:', err);
});
const db = {
    query: (text, params) => pool.query(text, params),
};
exports.default = db;
