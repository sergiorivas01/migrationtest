require('dotenv').config();

// Construir DATABASE_URL desde variables de entorno
const dbUrl = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;

// Obtener el nombre de la migración del argumento
const migrationName = process.argv[2];

if (!migrationName) {
    console.error('❌ Por favor proporciona un nombre para la migración');
    console.log('Uso: npm run migrate:create nombre_de_la_migracion');
    process.exit(1);
}

// Ejecutar node-pg-migrate create
const { execSync } = require('child_process');

try {
    execSync(`node_modules/.bin/node-pg-migrate create ${migrationName}`, {
        stdio: 'inherit',
        env: { ...process.env, DATABASE_URL: dbUrl }
    });
} catch (error) {
    process.exit(1);
}

