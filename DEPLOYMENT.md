# Deployment en Producción

## Servidor: fullstack.dcc.uchile.cl
## Puerto: 7104

### Pasos para el deployment:

#### 1. Conectarse al servidor

```bash
ssh usuario@fullstack.dcc.uchile.cl
```

#### 2. Clonar o actualizar el repositorio

```bash
# Si es primera vez:
git clone https://github.com/Gerlad64/cc5003-servicios.git
cd cc5003-servicios

# Si ya existe:
cd cc5003-servicios
git pull origin hito-3
```

#### 3. Configurar MongoDB

Asegúrate de que MongoDB esté corriendo en el servidor:

```bash
sudo systemctl status mongod
# Si no está corriendo:
sudo systemctl start mongod
```

#### 4. Configurar variables de entorno

Edita el archivo `.env.production` en el backend si es necesario:

```bash
cd backend
nano .env.production
```

Verifica que tenga:
```
PORT=7104
HOST=0.0.0.0
BASE_URL=http://fullstack.dcc.uchile.cl
NODE_ENV=production
MONGODB_URI=mongodb://localhost:27017/serviciosCLdb
MONGODB_DBNAME=serviciosCLdb
JWT_SECRET=tu_jwt_secret_seguro
```

#### 5. Ejecutar el script de deployment

```bash
cd ..
chmod +x deploy.sh
./deploy.sh
```

O manualmente:

```bash
# Frontend
cd frontend
npm install
npm run build

# Backend
cd ../backend
npm install
npm run build
cp .env.production .env
```

#### 6. Iniciar el servidor

**Opción A: Con Node directamente**
```bash
cd backend
npm run start:prod
```

**Opción B: Con PM2 (recomendado para producción)**
```bash
cd backend
pm2 start out/index.js --name cc5003-servicios
pm2 save
pm2 startup
```

#### 7. Verificar el deployment

Visita: `http://fullstack.dcc.uchile.cl:7104`

### Comandos útiles de PM2:

```bash
# Ver logs
pm2 logs cc5003-servicios

# Reiniciar
pm2 restart cc5003-servicios

# Detener
pm2 stop cc5003-servicios

# Ver estado
pm2 status

# Eliminar
pm2 delete cc5003-servicios
```

### Troubleshooting:

#### Puerto en uso:
```bash
# Ver qué proceso usa el puerto 7104
lsof -i :7104
# O con netstat
netstat -tulpn | grep 7104

# Matar el proceso si es necesario
kill -9 <PID>
```

#### Permisos:
```bash
# Si hay problemas de permisos con node_modules
sudo chown -R $USER:$USER .
```

#### MongoDB no conecta:
```bash
# Verificar que MongoDB esté corriendo
sudo systemctl status mongod

# Ver logs de MongoDB
sudo journalctl -u mongod

# Reiniciar MongoDB
sudo systemctl restart mongod
```

### Configuración del firewall:

Si el puerto 7104 no es accesible desde fuera:

```bash
# Con ufw
sudo ufw allow 7104/tcp

# Con firewalld
sudo firewall-cmd --permanent --add-port=7104/tcp
sudo firewall-cmd --reload
```

### Estructura del proyecto después del build:

```
cc5003-servicios/
├── backend/
│   ├── out/              # Código TypeScript compilado
│   │   └── index.js      # Punto de entrada
│   ├── src/              # Código fuente
│   └── .env              # Variables de entorno (copiado de .env.production)
├── frontend/
│   └── dist/             # Build de producción del frontend
│       ├── index.html
│       └── assets/
└── deploy.sh             # Script de deployment
```

### Notas importantes:

1. El backend sirve el frontend estático desde `/frontend/dist`
2. Todas las peticiones a `/api/*` van al backend
3. Las demás rutas sirven el `index.html` (SPA routing)
4. CORS está configurado para permitir `fullstack.dcc.uchile.cl:7104`
5. Las cookies funcionan con `credentials: true` en CORS

### Actualizar el deployment:

```bash
git pull origin hito-3
./deploy.sh
pm2 restart cc5003-servicios
```
