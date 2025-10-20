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

##### */api/users*

- get('/'): Trae todos los usuarios en formato json de la base de datos
- post('/'): Crea un nuevo usuario

##### */api/services*

- get('/'): Trae todos los servicios en formato json.
- post('/'): Crea un nuevo servicio si el usuario está autenticado.
- get('/:id): Trae un servicio según su id.

##### */api/login*

- post('/'): Se intenta iniciar sesión con los datos entregados.
- post('/logout'): Se cierra la sesión.