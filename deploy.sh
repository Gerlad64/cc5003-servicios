#!/bin/bash

# Script de deployment para fullstack.dcc.uchile.cl:7104

echo "🚀 Iniciando deployment en producción..."

# 1. Instalar dependencias del frontend
echo "📦 Instalando dependencias del frontend..."
cd frontend
npm install

# 2. Build del frontend
echo "🔨 Construyendo frontend..."
npm run build

# 3. Instalar dependencias del backend
echo "📦 Instalando dependencias del backend..."
cd ../backend
npm install

# 4. Build del backend
echo "🔨 Construyendo backend..."
npm run build

# 5. Copiar archivo .env.production
echo "⚙️  Configurando variables de entorno..."
cp .env.production .env

echo "✅ Build completado!"
echo ""
echo "Para iniciar el servidor en producción:"
echo "  cd backend"
echo "  npm run start:prod"
echo ""
echo "O con PM2:"
echo "  pm2 start out/index.js --name cc5003-servicios"
echo ""
echo "El servidor estará disponible en:"
echo "  http://fullstack.dcc.uchile.cl:7104"
