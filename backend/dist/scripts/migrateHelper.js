"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// Construir DATABASE_URL desde variables de entorno
const dbUrl = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;
// Configurar DATABASE_URL para node-pg-migrate
process.env.DATABASE_URL = dbUrl;
// Ejecutar node-pg-migrate con los argumentos pasados
const action = process.argv[2]; // 'up' o 'down'
const child_process_1 = require("child_process");
const path_1 = __importDefault(require("path"));
try {
    // Cambiar al directorio backend para que las migraciones se encuentren correctamente
    const backendDir = path_1.default.join(__dirname, '..');
    (0, child_process_1.execSync)(`node_modules/.bin/node-pg-migrate ${action}`, {
        cwd: backendDir,
        stdio: 'inherit',
        env: { ...process.env, DATABASE_URL: dbUrl }
    });
}
catch (error) {
    process.exit(1);
}
