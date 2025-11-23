# 🚀 DEPLOYMENT RÁPIDO - Puerto 7104

## En tu máquina local (antes de subir):

```bash
# 1. Commitear los cambios de configuración
git add .
git commit -m "config: preparar deployment para puerto 7104"
git push origin hito-3
```

## En el servidor fullstack.dcc.uchile.cl:

```bash
# 1. Conectarse
ssh tu_usuario@fullstack.dcc.uchile.cl

# 2. Clonar el repositorio (primera vez) o actualizarlo
git clone https://github.com/Gerlad64/cc5003-servicios.git
cd cc5003-servicios
# O si ya existe: git pull origin hito-3

# 3. Ejecutar deployment
chmod +x deploy.sh
./deploy.sh

# 4. Iniciar con PM2 (recomendado)
cd backend
pm2 start ../ecosystem.config.js
pm2 save

# O iniciar directamente
npm run start:prod
```

## Verificar:
Abrir en el navegador: **http://fullstack.dcc.uchile.cl:7104**

## Comandos útiles:
```bash
pm2 logs cc5003-servicios    # Ver logs
pm2 restart cc5003-servicios # Reiniciar
pm2 stop cc5003-servicios    # Detener
pm2 status                   # Ver estado
```

## ⚠️ IMPORTANTE:
- Verifica que MongoDB esté corriendo: `sudo systemctl status mongod`
- Verifica que el puerto 7104 esté disponible: `lsof -i :7104`
- Si hay problemas de firewall: `sudo ufw allow 7104/tcp`

Ver **DEPLOYMENT.md** para instrucciones detalladas.
