# cc5003-servicios

## README Hito 1

El frontend se creó con el siguiente comando:
    
    npm create vite@latest frontend -- --template react-ts

El backend se creó con los siguientes comandos:

    > mkdir backend
    > cd backend
    > npm init
    > npm install --save-dev typescript @types/node ts-node-dev
    > npx tsc --init

luego se modificaron los archivos package.json, y tsconfig.json según como están en la clase 06-Programming a Server

Para correr el server de backend:
    cd backend ; npm run server

Para correr el frontend:

     > cd frontend
     > npm install
     > npm run dev


## README Hito 2

### Sobre el Backend

#### Endpoints
En este hito, se incorporan los siguientes endpoints principales
- */api/users*
- */api/services*
- */api/login*
- */api/reviews*

##### */api/users*

- get('/'): Trae todos los usuarios en formato json de la base de datos
- post('/'): Crea un nuevo usuario

##### */api/services*

- get('/'): Trae todos los servicios en formato json.
- post('/'): Crea un nuevo servicio si el usuario está autenticado.
- get('/:id'): Trae un servicio según su id.

##### */api/login*

- post('/'): Se intenta iniciar sesión con los datos entregados.
- post('/logout'): Se cierra la sesión.

##### */api/reviews*

- get('/'): Trae todas las reseñas creadas de todos los servicios
- get('/:id'): Trae las reseñas asociadas al servicio con id entregado como parámetro.
- post('/:id'): Crea una nueva reseña al servicio con id entregado como parámetro.
#### Variables de entorno

- PORT=3001
- HOST=localhost
- MONGODB_URI=mongodb://localhost:27017
- TEST_MONGODB_URI=mongodb://localhost:27017
- MONGODB_DBNAME= serviciosCLdb
- TEST_MONGODB_DBNAME= test_serviciosCLdb
- JWT_SECRET=miclavesecreta

#### Tests End-to-End (E2E)

Para ejecutar los tests E2E:

    > cd e2e-tests
    > npm run test

Para ejecutar los tests E2E con una interfaz gráfica:

    > npm run test:ui