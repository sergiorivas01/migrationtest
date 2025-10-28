# GitHub Actions - Database Migrations

Este workflow ejecuta automáticamente las migraciones de base de datos cuando:

- Se hace push a las ramas `main` o `develop`
- Se crea un Pull Request hacia `main` o `develop`
- Se ejecuta manualmente desde la pestaña "Actions" de GitHub

## Triggers

El workflow se ejecuta solo cuando hay cambios en:

- Archivos en la carpeta `migrations/`
- El archivo de configuración del workflow
- El archivo `package.json`

## Configuración

El workflow usa un contenedor Docker de PostgreSQL para ejecutar las migraciones en un entorno aislado.

### Variables de Entorno

```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=migration
DB_USER=sergio
DB_PASSWORD=sergio123
```

## Ejecutar Manualmente

1. Ve a la pestaña "Actions" en tu repositorio de GitHub
2. Selecciona "Run Database Migrations"
3. Haz clic en "Run workflow"

## Ver Resultados

Después de cada ejecución, puedes ver:

- El estado de las migraciones ejecutadas
- Logs de cada paso del proceso
- Confirmación de las migraciones en la tabla `pgmigrations`
