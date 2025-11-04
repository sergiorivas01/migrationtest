import dotenv from 'dotenv';
dotenv.config();

// Build DATABASE_URL from env vars
const dbUrl = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;

// Configure DATABASE_URL for node-pg-migrate
process.env.DATABASE_URL = dbUrl;

// Execute node-pg-migrate with provided args
const action = process.argv[2]; // 'up' or 'down'
import { execSync } from 'child_process';
import path from 'path';

try {
    // Change cwd to backend so migrations resolve correctly
    const backendDir = path.join(__dirname, '..');
    
    execSync(`node_modules/.bin/node-pg-migrate ${action}`, {
        cwd: backendDir,
        stdio: 'inherit',
        env: { ...process.env, DATABASE_URL: dbUrl }
    });
} catch (error) {
    process.exit(1);
}


