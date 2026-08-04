FROM node:22-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ARG DATABASE_URL="postgresql://neondb_owner:npg_RoK25qglcYjZ@ep-mute-unit-axwq2svc.c-4.us-east-2.aws.neon.tech/neondb?sslmode=require"

ENV DATABASE_URL=$DATABASE_URL

RUN npx prisma generate

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start"]