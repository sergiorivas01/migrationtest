"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// Construir DATABASE_URL desde variables de entorno
const dbUrl = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;
// Obtener el nombre de la migración del argumento
const migrationName = process.argv[2];
if (!migrationName) {
    console.error('❌ Por favor proporciona un nombre para la migración');
    console.log('Uso: npm run migrate:create nombre_de_la_migracion');
    process.exit(1);
}
const child_process_1 = require("child_process");
const path_1 = __importDefault(require("path"));
try {
    // Cambiar al directorio backend para que las migraciones se creen en el lugar correcto
    const backendDir = path_1.default.join(__dirname, '..');
    (0, child_process_1.execSync)(`node_modules/.bin/node-pg-migrate create ${migrationName}`, {
        cwd: backendDir,
        stdio: 'inherit',
        env: { ...process.env, DATABASE_URL: dbUrl }
    });
}
catch (error) {
    process.exit(1);
}
