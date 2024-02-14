# Descripción

Este proyecto fue hecho con el curso "Next.js El framework de React para producción" de Fernando Herrera en Dev/Talles.

Se trata de un e-commerce completo, hecho desde cero

# Correr en desarrollo (localhost)

1. Clonar el repositorio
2. Crear una copia del archivo ```.env.template``` y renombrarlo como ```.env``` y cambiar sus variables de entorno
3. Instalar dependencias ```npm install```
4. Levantar la base de datos ```docker compose up -d``` (La base de datos se debe haber levantado)
5. Correr las migraciones de Prisma ```npx prisma migrate dev```
6. Ejecutar seed ```npm run seed``` para importar los datos de inicio
7. Limpiar el localStorage del navegador
8. Correr el proyecto ```npm run dev```