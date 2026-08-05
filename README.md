# MatchMe

Analiza tu CV y compáralo con una oferta laboral para obtener un porcentaje de compatibilidad con la IA.

## Stack

- **Frontend:** Angular 21
- **Backend:** Node.js + Express + Prisma
- **Base de datos:** PostgreSQL
- **IA:** Google Gemini (skills, match y recomendaciones)

## Deploy (todo en tier gratuito)

| Servicio | Dónde |
| -------- | ----- |
| Frontend | Vercel |
| Backend | Render (Web Service) |
| Base de datos | Neon (PostgreSQL) |

### Render (backend)

1. Crea una Web Service apuntando a este repo.
2. Build command: `cd backend && npm install && npm run build`
3. Start command: `cd backend && npm start`
4. Agrega las variables de entorno del backend (ver abajo).

### Neon (base de datos)

1. Crea un proyecto en Neon y copia la conexión de PostgreSQL.
2. Úsala como `DATABASE_URL` en Render y en local.
3. Corre las migraciones: `npx prisma migrate deploy`

### Vercel (frontend)

1. Importa el repo con root directory `frontend`.
2. Build command: `npm run build` (output `dist/match-me-frontend`).
3. Variable `apiUrl` apuntando a tu backend de Render (ej. `https://tu-api.onrender.com/api/v1`).

## Variables de entorno (backend)

```
DATABASE_URL=postgresql://...
JWT_SECRET=tu_secreto
JWT_EXPIRES_IN=7d
GEMINI_API_KEY=tu_api_key
GEMINI_MODEL=gemini-2.5-flash
PORT=3000
```

## Desarrollo local

### Backend

```bash
cd backend
npm install
# crear archivo .env con las variables de arriba
npx prisma migrate dev
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm start
```

Frontend en `http://localhost:4200`, backend en `http://localhost:3000`.

## Scripts útiles

```bash
# Backend
npm run dev    # servidor de desarrollo
npm run build  # compilar TS
npm start      # producción (node dist/index.js)

# Frontend
npm start      # servidor de desarrollo
npm run build  # compilar producción
```
