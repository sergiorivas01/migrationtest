import dotenv from 'dotenv';
dotenv.config();

// Build DATABASE_URL from env vars
const dbUrl = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;

// Get migration name from CLI arg
const migrationName = process.argv[2];

if (!migrationName) {
    console.error('❌ Please provide a migration name');
    console.log('Usage: npm run migrate:create migration_name');
    process.exit(1);
}

import { execSync } from 'child_process';
import path from 'path';

try {
    // Change to backend dir so migrations are created in the right place
    const backendDir = path.join(__dirname, '..');
    
    execSync(`node_modules/.bin/node-pg-migrate create ${migrationName}`, {
        cwd: backendDir,
        stdio: 'inherit',
        env: { ...process.env, DATABASE_URL: dbUrl }
    });
} catch (error) {
    process.exit(1);
}


