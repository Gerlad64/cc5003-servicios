# cc5003-servicios

El frontend se creó con el siguiente comando:
    npm create vite@latest frontend -- --template react-ts

El backend se creó con los siguientes comandos:
    mkdir backend
    cd backend
    npm init
    npm install --save-dev typescript @types/node ts-node-dev
    npx tsc --init
luego se modificaron los archivos package.json, y tsconfig.json según como están en la clase 06-Programming a Server

Para correr el server de backend:
    cd backend ; npm run server

Para correr el frontend:
    cd frontend
    npm install
    npm run dev
