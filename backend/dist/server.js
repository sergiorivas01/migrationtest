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
// Servir archivos estáticos del frontend compilado
const frontendDistPath = path_1.default.join(__dirname, '..', 'frontend', 'dist');
// Verificar si existe el directorio dist
if (!fs_1.default.existsSync(frontendDistPath)) {
    console.warn('⚠️  ADVERTENCIA: El directorio frontend/dist no existe.');
    console.warn('   Ejecuta "npm run frontend:build" para compilar el frontend.');
}
app.use(express_1.default.static(frontendDistPath));
// Rutas API
app.use('/api/users', users_1.default);
app.use('/api/posts', posts_1.default);
app.use('/api/todos', todos_1.default);
// Ruta raíz (sirve la SPA compilada)
app.get('/', (req, res) => {
    const indexPath = path_1.default.join(frontendDistPath, 'index.html');
    if (fs_1.default.existsSync(indexPath)) {
        res.sendFile(indexPath);
    }
    else {
        res.status(503).send(`
            <html>
                <head><title>Frontend no compilado</title></head>
                <body>
                    <h1>⚠️ Frontend no compilado</h1>
                    <p>El directorio <code>frontend/dist</code> no existe.</p>
                    <p>Por favor, ejecuta: <code>npm run frontend:build</code></p>
                </body>
            </html>
        `);
    }
});
// Manejo de errores
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Algo salió mal!' });
});
// Iniciar servidor
app.listen(PORT, async () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    console.log(`📊 Conectando a: ${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`);
    // Probar conexión a la base de datos
    try {
        await database_1.default.query('SELECT NOW()');
        console.log('✅ Conexión a PostgreSQL establecida');
    }
    catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        console.error('❌ Error al conectar con PostgreSQL:', message);
        console.error('💡 Verifica que el contenedor Docker esté corriendo');
    }
});
exports.default = app;
