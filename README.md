<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

# Descripción

Este proyecto se trata del desarrollo de un backend usando mongodb como base de datos mediante docker con NetJS

# Requisitos del proyecto

Node.JS (Ingrese a la página para descargar la última versión disponible dependiendo de su sistema operativo)

<a href="https://nodejs.org/es/download">Ir a la página de descargas de Node.JS</a>

Docker Desktop (Para montar la base de datos en el modo desarrollo)

<a href="https://www.docker.com/products/docker-desktop/">Ir a la página de descargas de Docker Desktop</a>

NestJS Cli (Para instalarlo ejecutar el siguiente comando)
```
npm i -g @nestjs/cli
```


# Tecnologias implementadas
- NetJS
- Express.js
- Node.JS
- Typescript
- Docker
- MongoDB

# Como ejecuto el proyecto?

Modo desarrollo:

1 - Clonar el repositorio

2 - Ejecutar el comando (Para instalar dependencias)
```
npm install
```
3 - Ejecutar el comando (Para ejecutar el proyecto)
```
npm run start
```
4 - Ejecutar el comando (Para montar la base de datos)
```
docker-compose up -d
```
5 - Clonar el archivo   
```
.env.template
```
y renombrar el archivo a
```
.env
```
6 - Rellenar el contenido de las variables de entorno ya definidas
```
.env
```
7- Ejecutar el comando (en ambiente de desarrollo):
```
yarn start
```
8 - Ejecutar el comando (Para reconstruir la base de datos con la semilla)
```
Peticion Get(http://localhost:3000/api/v2/seed)
```
9 - Despliege en produccion
a - Para el despliege en producción (crear el siguiente archivo)
```
.env.prod
```
b - Llenar las variables de entorno de produccion
c - Crear la nueva imagen
```
docker-compose -f docker-compose.prod.yaml --env-file .env.prod up --build
```
