FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma

RUN npm ci

COPY . .

ARG DATABASE_URL="postgresql://postgres:postgres@localhost:5432/postgres"
ENV DATABASE_URL=${DATABASE_URL}

RUN npx prisma generate
RUN npm run build

EXPOSE 3000

CMD ["node", "dist/src/main.js"]