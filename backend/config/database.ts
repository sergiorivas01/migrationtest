import { Pool, PoolConfig } from 'pg';

// Try to get connection string from Azure environment variables first
const connStr = process.env.DATABASE_URL;

let pool: Pool;

if (connStr) {
    // Use connection string (Azure App Service style)
    // Azure PostgreSQL requires SSL with rejectUnauthorized: false
    const poolConfig: PoolConfig = {
        connectionString: connStr,
        ssl: { rejectUnauthorized: false },
        max: 20,
        idleTimeoutMillis: 30000,
        connectionTimeoutMillis: 20000,
    };
    pool = new Pool(poolConfig);
    console.log('📊 Using DATABASE_URL connection string');
} else {
    // Fallback to individual parameters (local development)
type DatabaseConfig = {
    host: string;
    port: number;
    database: string;
    user: string;
    password?: string;
    max: number;
    idleTimeoutMillis: number;
    connectionTimeoutMillis: number;
        ssl?: boolean | { rejectUnauthorized: boolean };
};

const dbConfig: DatabaseConfig = {
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

    // Enable SSL if requested via environment variables
    // DB_SSL: 'true' to enable TLS encryption
    // DB_SSL_REJECT_UNAUTHORIZED: 'false' to skip cert verification (not recommended)
    if (process.env.DB_SSL === 'true') {
        const rejectUnauthorized = process.env.DB_SSL_REJECT_UNAUTHORIZED === 'false' ? false : true;
        dbConfig.ssl = { rejectUnauthorized };
    }

    pool = new Pool(dbConfig);
    console.log('📊 Using individual database parameters');
}

// Event listeners para depuración
pool.on('connect', () => {
    console.log('🔌 Nueva conexión establecida con PostgreSQL');
});

pool.on('error', (err: Error) => {
    console.error('❌ Error inesperado en el cliente PostgreSQL:', err);
});

const db = {
    query: (text: string, params?: unknown[]) => pool.query(text, params),
};

export default db;


