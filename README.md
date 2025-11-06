# ImageProject

Full-stack web application with Node.js, Express, TypeScript, Vite, and PostgreSQL.

## 🚀 Features

- ✅ **Backend with Node.js/Express/TypeScript**: RESTful API to interact with the database
- 🗄️ **PostgreSQL Database**: Persistent data storage with migrations
- 🎨 **Modern Frontend with Vite**: Interface with TypeScript, gradients and animations
- 📱 **Responsive**: Adaptable to different screen sizes
- ⚡ **API Routes**: Complete CRUD for users, posts, and todos
- 🔄 **Migration System**: Database change management with `node-pg-migrate`

## 📁 Project Structure

```
imageproject/
├── backend/                    # Backend API
│   ├── config/                 # Configuration
│   │   └── database.ts         # PostgreSQL configuration
│   ├── routes/                 # API routes
│   │   ├── users.ts            # User routes
│   │   ├── posts.ts            # Post routes
│   │   └── todos.ts            # Todo routes
│   ├── scripts/                # Utility scripts
│   │   ├── initDatabase.ts     # Database initialization
│   │   ├── migrateHelper.ts    # Migration helper
│   │   └── createMigration.ts  # Create new migrations
│   ├── migrations/             # Database migrations
│   ├── dist/                   # Compiled code (TypeScript)
│   ├── server.ts               # Main server
│   ├── package.json            # Backend dependencies
│   └── tsconfig.json           # TypeScript configuration
├── frontend/                   # Frontend SPA
│   ├── public/                 # Public files
│   │   └── data/               # Example JSON data
│   ├── dist/                   # Production build
│   ├── index.html              # Main page
│   ├── script.ts               # Frontend logic (TypeScript)
│   ├── style.css               # CSS styles
│   ├── vite.config.ts          # Vite configuration
│   ├── package.json            # Frontend dependencies
│   └── tsconfig.json           # TypeScript configuration
└── .github/workflows/          # GitHub Actions for CI/CD
```

## 🛠️ Installation

### Prerequisites

- Node.js 20 or higher
- PostgreSQL 12 or higher
- npm or yarn

### 1. Install Dependencies

```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### 2. Configure PostgreSQL

Make sure PostgreSQL is installed and running. Then:

1. Create a `.env` file in the project root or in `backend/`:

```bash
# In the project root
touch .env
```

2. Edit the `.env` file with your credentials:

```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=imageproject_db
DB_USER=postgres
DB_PASSWORD=your_password
PORT=3000
```

3. Create the database:

```bash
createdb imageproject_db
```

4. Initialize tables and example data:

```bash
cd backend
npm run db:init
```

5. (Optional) Run migrations:

```bash
cd backend
npm run migrate:up
```

### 3. Configure migrate.json (for migrations)

If you're going to use migrations, copy the template:

```bash
cd backend
cp migrate.json.example migrate.json
```

Edit `migrate.json` with your database credentials.

### 4. Start the Project

**Option A: Development (separate)**

```bash
# Terminal 1 - Backend
cd backend
npm run dev
# Backend will be at http://localhost:3000

# Terminal 2 - Frontend
cd frontend
npm run dev
# Frontend will be at http://localhost:8001
```

**Option B: Production (backend serves frontend)**

```bash
# 1. Build the frontend
cd frontend
npm run build

# 2. Build the backend
cd ../backend
npm run build

# 3. Start the server
npm start
# Everything will be available at http://localhost:3000
```

## 📡 API Endpoints

### Users

- `GET /users` - Get all users
- `GET /users/:id` - Get a specific user
- `POST /users` - Create a new user

### Posts

- `GET /posts` - Get all posts
- `GET /posts/:id` - Get a specific post
- `POST /posts` - Create a new post

### Todos

- `GET /todos` - Get all todos
- `GET /todos/:id` - Get a specific todo
- `POST /todos` - Create a new todo
- `PATCH /todos/:id` - Update todo status

## 💻 Usage

### Development

1. Start the backend at `http://localhost:3000`
2. Start the frontend at `http://localhost:8001`
3. Open your browser at `http://localhost:8001`
4. Click the buttons to load data:
   - **Get Users**: Shows users from the database
   - **Get Posts**: Shows posts from the database
   - **Get Todos**: Shows todos from the database

### Production

The backend serves the compiled frontend from `http://localhost:3000`

## 🗄️ Database

### Tables

1. **users**: Stores user information

   - `id` (SERIAL PRIMARY KEY)
   - `name` (VARCHAR)
   - `email` (VARCHAR, UNIQUE)
   - `phone` (VARCHAR)
   - `city` (VARCHAR)
   - `company` (VARCHAR)
   - `created_at` (TIMESTAMP)

2. **posts**: Stores posts

   - `id` (SERIAL PRIMARY KEY)
   - `title` (VARCHAR)
   - `body` (TEXT)
   - `user_id` (INTEGER, FK to users)

3. **todos**: Stores todos
   - `id` (SERIAL PRIMARY KEY)
   - `title` (VARCHAR)
   - `completed` (BOOLEAN)

### Initialization

The script `backend/scripts/initDatabase.ts` creates the tables and inserts example data automatically.

### Migrations

The project uses `node-pg-migrate` to manage database changes:

```bash
cd backend

# Create a new migration
npm run migrate:create migration_name

# Run pending migrations
npm run migrate:up

# Revert the last migration
npm run migrate:down
```

Migrations are located in `backend/migrations/`.

## 🔧 Technologies Used

### Backend

- **Node.js** 20+
- **Express** - Web framework
- **TypeScript** - Static typing
- **PostgreSQL** 12+ - Relational database
- **pg** - PostgreSQL client for Node.js
- **node-pg-migrate** - Migration management
- **dotenv** - Environment variables
- **cors** - CORS support

### Frontend

- **Vite** - Build tool and dev server
- **TypeScript** - Static typing
- **HTML5/CSS3** - Structure and styles

## 📝 Available Scripts

### Backend (`backend/package.json`)

- `npm run dev` - Start the server in development mode with auto-reload
- `npm run build` - Compile TypeScript to JavaScript
- `npm start` - Start the server in production mode (requires build)
- `npm run db:init` - Initialize the database with tables and example data
- `npm run migrate:up` - Run pending migrations
- `npm run migrate:down` - Revert the last migration
- `npm run migrate:create <name>` - Create a new migration

### Frontend (`frontend/package.json`)

- `npm run dev` - Start the development server (port 8001)
- `npm run build` - Build the project for production
- `npm run preview` - Preview the production build

## 🔒 Security

- ⚠️ **NEVER** commit files with credentials to the repository
- The `backend/migrate.json` file is in `.gitignore` (use `migrate.json.example` as a template)
- Environment variables (`.env`) are also ignored
- Change passwords if they were accidentally committed to the repository

## 🚀 Deployment

The project includes GitHub Actions workflows for automatic deployment:

- **Backend**: `.github/workflows/deploy-backend.yml` - Deploys to Azure Web App
- **Frontend**: `.github/workflows/deploy-frontend.yml` - Deploys to Azure Static Web Apps

Workflows are automatically triggered on push to `main` or `dev` branches.

## 🤝 Contributing

Contributions are welcome. Please:

1. Fork the project
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

MIT License
