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
git clone https://github.com/martincho222/backend49i.git
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

#### Login Routes

Para loguearse y obtener el token de autenticacion:

```
POST     /api/v1/user/login
```

#### Categorias Routes

```
GET     /api/v1/categorias
POST     /api/v1/categoria
```

#### Cursos Routes

```
GET     /api/v1/cursos
POST     /api/v1/curso
DELETE     /api/v1/curso/:id
PUT     /api/v1/curso/:id
```

# Tecnologia Principal
* [NodeJS](https://nodejs.org/es/) - FrameWork Back-End

## Frameworks adicionales y otras implementaciones
* [Express](https://expressjs.com/es/) - Infraestructura web rápida, minimalista y flexible para Node.js
* [nodemon](https://nodemon.io) - Actualiza tu servidor de Node cuando realizas cambios en algun archivo
* [Bcrypt](https://www.npmjs.com/package/bcryptjs) - Encriptación
* [JWT](https://jwt.io/) - Generar tokens
* [Mongoose](https://mongoosejs.com/) - Modelado de objetos MongoDB para Node.js
* [morgan](https://www.npmjs.com/package/morgan) - HTTP request logger middleware for node.js
* [passport](http://www.passportjs.org/) - Autenticaciones en NodeJs
* [dotenv](https://www.npmjs.com/package/dotenv) - Variables de Entorno
* [cors](https://www.npmjs.com/package/cors) - Control de Acceso HTTP
* [multer](https://www.npmjs.com/package/multer) - Manejo de archivos en NodeJS
* [cloudinary](https://cloudinary.com/documentation/node_integration) - Almacenamiento de imagenes y videos

# Base de Datos
* [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) - Cloud


## Autores ✒️
* **Nombre del integrante**
