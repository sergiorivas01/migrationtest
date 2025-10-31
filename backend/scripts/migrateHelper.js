require('dotenv').config();

// Construir DATABASE_URL desde variables de entorno
const dbUrl = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;

// Configurar DATABASE_URL para node-pg-migrate
process.env.DATABASE_URL = dbUrl;

// Ejecutar node-pg-migrate con los argumentos pasados
const action = process.argv[2]; // 'up' o 'down'
const { execSync } = require('child_process');

try {
    // Cambiar al directorio backend para que las migraciones se encuentren correctamente
    const path = require('path');
    const backendDir = path.join(__dirname, '..');
    
    execSync(`node_modules/.bin/node-pg-migrate ${action}`, {
        cwd: backendDir,
        stdio: 'inherit',
        env: { ...process.env, DATABASE_URL: dbUrl }
    });
} catch (error) {
    process.exit(1);
}
