# cc5003-servicios

## Motivación del Proyecto
Actualmente no existe una plataforma centralizada y dedicada a la oferta y contratación 
de *servicios particulares* (por ejemplo: paseo de mascotas, gasfitería, etc), por lo que 
se depende de contactos y recomendaciones, o de secciones menores en otras plataformas, como 
WhatsApp o Facebook Marketplace. Muchas veces la *ubicación* puede ser un factor a considerar en la prestación de estos servicios, y con los métodos que se ocupan a día de hoy es difícil filtrar las ofertas según este aspecto.

Se propone la creación de una página web en que los usuarios *prestadores* puedan publicar 
los servicios que ofrecen según la ubicación en la que los desarrollan, y otros usuarios 
*contratadores* puedan encontrar la opción que consideren más conveniente según los detalles 
que sean especificados por el prestador, incluyendo *calificaciones* y *reseñas* de contratadores 
anteriores. El proyecto parte sólo con las *comunas* de la *Región Metropolitana*, y con un conjunto 
*acotado* de servicios, donde los que no están en este conjunto se considerarán como otros servicios 
o servicios novedosos. Esto hace que el proyecto sea escalable a más sectores y a más servicios 
(los más solicitados).
## Estructura Inicial

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

Para correr el frontend a modo de prueba:
     > cd frontend
     > npm install
     > npm run dev
El backend se creó con los siguientes comandos: 

    > mkdir backend 
    > cd backend 
    > npm init 
    > npm install --save-dev typescript @types/node ts-node-dev 
    > npx tsc --init 

luego se modificaron los archivos package.json, y tsconfig.json según como están en la clase 06-Programming a Server

## Backend

### Endpoints
El backend incorpora los siguientes endpoints
- */api/users*
- */api/services*
- */api/login*
- */api/reviews*
- */api/testing*

#### */api/users*

- get('/'): Trae todos los usuarios en formato json de la base de datos
- get('/:id') Trae el usuario el usuario con el id entregado como parámetro
- post('/'): Crea un nuevo usuario
- put('/:id'): Edita la información del usuario identicado por el id entregado.
- put('/:id/profile'): Permite cambiar la foto de perfil del usuario identificado por el id entregado.

#### */api/services*

- get('/'): Trae todos los servicios en formato json.
- post('/'): Crea un nuevo servicio si el usuario está autenticado.
- get('/:id'): Trae un servicio según su id.

#### */api/login*

- post('/'): Se intenta iniciar sesión con los datos entregados.
- post('/logout'): Se cierra la sesión.

#### */api/reviews*

- get('/'): Trae todas las reseñas creadas de todos los servicios
- get('/service/:id'): Trae las reseñas asociadas al servicio con id entregado como parámetro.
- post('/:id'): Crea una nueva reseña al servicio con id entregado como parámetro.

#### */api/testing*
Usada para los tests end to end del frontend.
- post('/reset'): elimina los datos de las db de prueba existentes.
### Variables de entorno
Se utilizan las siguientes variables de entorno
- PORT=3001 # puerto en el que se despliega la aplicación
- HOST=localhost # host de la app
- BASE_URL=http://localhost:3001 # url del sitio donde se despliega la app
- MONGODB_URI=mongodb://localhost:27017 # url de la db de mongo
- TEST_MONGODB_URI=mongodb://localhost:27017 # url de la db de testing de mongo
- MONGODB_DBNAME= serviciosCLdb # nombre de la db
- TEST_MONGODB_DBNAME= test_serviciosCLdb # nombre de la db de prueba
- JWT_SECRET=miclavesecreta # clave secreta para los JWT

## Frontend
### Rutas
Se implementan las siguientes rutas:
- */* (homepage)
- */services*
- */register*
- */login*
- */me*

#### */* (homepage)
En esta ruta se implementa la homepage de la página

#### */services* 
En esta ruta se implementa la busqueda de servicios, en ella se puede consultar por algun servicio
desplegado en la página. Por defecto, muestra todos los servicios disponibles hasta el momento, pero
se puede filtrar por algún tipo de servicio en la barra de filtros.
#### */services/create*
Esta sub-ruta contiene el formulario de creación de servicios.


#### */register*
Permite el registro de un usuario. Luego de que este se registra, es redirigido a */login*

#### */login*
Permite ingresar sesión a los usuarios ya registrados, seteando las cookies y el token csrf.

#### */me*
Ruta que lleva a la página de un usuario con sesión iniciada, en ella se puede ver el rating de usuario
(asociado a los servicios ya creados), foto de perfil y biografía.

### Flujo de Autenticación
#### Paso 1: El Usuario envía las credenciales desde /login
En este caso, solo nombre de usuario y contraseña.
#### Paso 2: El Backend Valida las credenciales
Revisa si el usuario existe y compara si las contraseñas encriptadas son iguales.
#### Paso 3: 
El servidor retorna en una cookie el jwt generado y el csrf token en el header.
#### Paso 4:
Se almacena lo retornado en el almacenamiento local y las cookies respectivamente.
#### Paso 5:
Se permite el acceso a rutas privadas como /me y se permite la creación de servicios.

### Estado Global

Se utilizo la libreria Zustand para implementar stores de servicios y reseñas.

### Tests End-to-End (E2E)

Se implementaron tests con la libreria playwright para los flujos de inicio de sesion exitoso y fallido, cierre de sesion y de creacion exitosa y fallida de un servicio.

Para ejecutar los tests E2E:

    > cd e2e-tests
    > npm run test

Para ejecutar los tests E2E con una interfaz gráfica:

    > npm run test:ui
### Librería de Estilos
Se escogio utilizar Material UI

## Aplicación desplegada
http://fullstack.dcc.uchile.cl:7104