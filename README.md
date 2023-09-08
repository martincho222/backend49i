# Cursos API

## Introduction
Este repositorio es la representación en codigo del backend para la API de cursos para la comisión 49i

## Run

### Configurar conexión a la base de datos
Debe ir al archivo `.env` y agregar la url de conexión a la base de datos mongoDB.
Pueden utilizar la siguiente URL, pero necesita obtener su `username`, `password` y `dbName`, incluso el nombre del `cluster` que crearon en sus base de datos.

```
mongodb+srv://<username>:<password>@cluster49i.mjdkqqj.mongodb.net/
```


### Instalar

```
cd backend-cursos
npm install
```

### Iniciar API

```
npm run dev
```

## Routes

### Users

```
GET      /api/v1/user
GET      /api/v1/user/:id
POST     /api/v1/user
PUT      /api/v1/user/:id
PUT      /api/v1/admin/:id
DELETE   /api/v1/user/:id
GET users count: /api/v1/users/get/count
```

#### Registrar un nuevo usuario

```
POST     /api/v1/user/register
```

#### Login usuario

Para loguearse y obtener el token de autenticacion:

```
POST     /api/v1/user/login
```