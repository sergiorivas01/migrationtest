# Proyecto ImageProject

Aplicación web full-stack con Node.js, Express y PostgreSQL.

## 🚀 Características

- ✅ **Backend con Node.js y Express**: API RESTful para interactuar con la base de datos
- 🗄️ **Base de datos PostgreSQL**: Almacenamiento persistente de datos
- 🎨 **Frontend moderno**: Interfaz con gradientes y animaciones
- 📱 **Responsive**: Adaptable a diferentes tamaños de pantalla
- ⚡ **Rutas API**: CRUD completo para usuarios, publicaciones y tareas

## 📁 Estructura del Proyecto

```
imageproject/
├── public/               # Archivos estáticos
│   ├── index.html       # Página principal
│   ├── style.css        # Estilos CSS
│   └── script.js        # Lógica del frontend
├── config/              # Configuración
│   └── database.js      # Configuración PostgreSQL
├── routes/              # Rutas de la API
│   ├── users.js         # Rutas de usuarios
│   ├── posts.js         # Rutas de publicaciones
│   └── todos.js         # Rutas de tareas
├── scripts/             # Scripts de utilidad
│   └── initDatabase.js  # Inicialización de BD
├── server.js            # Servidor principal
├── package.json         # Dependencias del proyecto
└── .env.example         # Ejemplo de variables de entorno
```

## 🛠️ Instalación

### 1. Instalar dependencias

```bash
npm install
```

### 2. Configurar PostgreSQL

Asegúrate de tener PostgreSQL instalado y corriendo. Luego:

1. Crea un archivo `.env` basado en `.env.example`:

```bash
cp .env.example .env
```

2. Edita el archivo `.env` con tus credenciales:

```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=imageproject_db
DB_USER=postgres
DB_PASSWORD=tu_contraseña
PORT=3000
```

3. Crea la base de datos:

```bash
createdb imageproject_db
```

4. Inicializa las tablas y datos de ejemplo:

```bash
npm run init-db
```

### 3. Iniciar el servidor

```bash
# Modo producción
npm start

# Modo desarrollo (con auto-reload)
npm run dev
```

El servidor estará disponible en `http://localhost:3000`

## 📡 Endpoints API

### Usuarios

- `GET /api/users` - Obtener todos los usuarios
- `GET /api/users/:id` - Obtener un usuario específico
- `POST /api/users` - Crear un nuevo usuario

### Publicaciones

- `GET /api/posts` - Obtener todas las publicaciones
- `GET /api/posts/:id` - Obtener una publicación específica
- `POST /api/posts` - Crear una nueva publicación

### Tareas

- `GET /api/todos` - Obtener todas las tareas
- `GET /api/todos/:id` - Obtener una tarea específica
- `POST /api/todos` - Crear una nueva tarea
- `PATCH /api/todos/:id` - Actualizar el estado de una tarea

## 💻 Uso

1. Abre tu navegador en `http://localhost:3000`
2. Haz clic en los botones para cargar datos:
   - **Obtener Usuarios**: Muestra usuarios de la base de datos
   - **Obtener Publicaciones**: Muestra publicaciones de la base de datos
   - **Obtener Tareas**: Muestra tareas de la base de datos

## 🗄️ Base de Datos

### Tablas

1. **users**: Almacena información de usuarios

   - id, name, email, phone, city, company

2. **posts**: Almacena publicaciones

   - id, title, body, user_id

3. **todos**: Almacena tareas
   - id, title, completed

### Inicialización

El script `scripts/initDatabase.js` crea las tablas e inserta datos de ejemplo automáticamente.

## 🔧 Tecnologías Utilizadas

- **Backend**: Node.js, Express
- **Base de datos**: PostgreSQL
- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Otros**: pg (cliente PostgreSQL), dotenv, cors

## 📝 Scripts Disponibles

- `npm start` - Inicia el servidor en modo producción
- `npm run dev` - Inicia el servidor con nodemon (desarrollo)
- `npm run init-db` - Inicializa la base de datos

## 🤝 Contribuir

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

MIT License
