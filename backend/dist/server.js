"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
const fs_1 = __importDefault(require("fs"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const database_1 = __importDefault(require("./config/database"));
const users_1 = __importDefault(require("./routes/users"));
const posts_1 = __importDefault(require("./routes/posts"));
const todos_1 = __importDefault(require("./routes/todos"));
const app = (0, express_1.default)();
const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// API routes without /api prefix (must be BEFORE static)
app.use('/users', users_1.default);
app.use('/posts', posts_1.default);
app.use('/todos', todos_1.default);
// Serve compiled frontend static files
const frontendDistPath = path_1.default.join(__dirname, '..', 'frontend', 'dist');
// Warn if dist folder is missing
if (!fs_1.default.existsSync(frontendDistPath)) {
    console.warn('⚠️  WARNING: The frontend/dist directory does not exist.');
    console.warn('   Run "npm run frontend:build" to build the frontend.');
}
app.use(express_1.default.static(frontendDistPath));
// Root (serves the compiled SPA)
app.get('/', (req, res) => {
    const indexPath = path_1.default.join(frontendDistPath, 'index.html');
    if (fs_1.default.existsSync(indexPath)) {
        res.sendFile(indexPath);
    }
    else {
        res.status(503).send(`
            <html>
                <head><title>Frontend not built</title></head>
                <body>
                    <h1>⚠️ Frontend not built</h1>
                    <p>The <code>frontend/dist</code> directory does not exist.</p>
                    <p>Please run: <code>npm run frontend:build</code></p>
                </body>
            </html>
        `);
    }
});
// Manejo de errores
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});
// Iniciar servidor
app.listen(PORT, async () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
    console.log(`📊 Connecting to: ${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`);
    // Probar conexión a la base de datos
    try {
        await database_1.default.query('SELECT NOW()');
        console.log('✅ PostgreSQL connection established');
    }
    catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        console.error('❌ Error connecting to PostgreSQL:', message);
        console.error('💡 Make sure the Docker container is running');
    }
});
exports.default = app;
