import dotenv from 'dotenv';
dotenv.config();

// Validate required environment variables
const requiredVars = ['DB_USER', 'DB_PASSWORD', 'DB_HOST', 'DB_PORT', 'DB_NAME'];
const missingVars = requiredVars.filter(varName => !process.env[varName]);

if (missingVars.length > 0) {
    console.error(`Missing required environment variables: ${missingVars.join(', ')}`);
    process.exit(1);
}

// Build DATABASE_URL from env vars
const dbUser = encodeURIComponent(process.env.DB_USER!);
const dbPassword = encodeURIComponent(process.env.DB_PASSWORD!);
const dbHost = process.env.DB_HOST!;
const dbPort = process.env.DB_PORT!;
const dbName = process.env.DB_NAME!;

// Append ssl flag if requested
const sslEnabled = (process.env.DB_SSL || '').toLowerCase() === 'true';
const baseUrl = `postgresql://${dbUser}:${dbPassword}@${dbHost}:${dbPort}/${dbName}`;
const dbUrl = sslEnabled ? `${baseUrl}?ssl=true` : baseUrl;

// Configure DATABASE_URL for node-pg-migrate
process.env.DATABASE_URL = dbUrl;

// Execute node-pg-migrate with provided args
const action = process.argv[2]; // 'up' or 'down'
import { execSync } from 'child_process';
import path from 'path';

try {
    // Change cwd to backend so migrations resolve correctly
    const backendDir = path.join(__dirname, '..');
    
    // Log connection info (without password)
    console.log(`Connecting to: ${dbHost}:${dbPort}/${dbName} (ssl=${sslEnabled})`);
    console.log(`Running migrations: ${action}`);
    
    // Ensure DATABASE_URL is set in the environment
    const env = { ...process.env, DATABASE_URL: dbUrl };
    
    execSync(`npx node-pg-migrate ${action}`, {
        cwd: backendDir,
        stdio: 'inherit',
        env: env
    });
    
    console.log('Migrations completed successfully');
} catch (error) {
    console.error('Migration error:', error);
    process.exit(1);
}


