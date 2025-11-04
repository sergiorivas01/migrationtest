"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// Build DATABASE_URL from env vars
const dbUrl = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;
// Get migration name from CLI arg
const migrationName = process.argv[2];
if (!migrationName) {
    console.error('❌ Please provide a migration name');
    console.log('Usage: npm run migrate:create migration_name');
    process.exit(1);
}
const child_process_1 = require("child_process");
const path_1 = __importDefault(require("path"));
try {
    // Change to backend dir so migrations are created in the right place
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
