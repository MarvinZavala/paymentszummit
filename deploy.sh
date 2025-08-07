#!/bin/bash

# Script de Despliegue Automatizado para Zummit Payments
# Autor: Marvin Zavala
# Fecha: $(date)

echo "🚀 Iniciando despliegue de Zummit Payments..."
echo "================================================"

# Verificar si Vercel CLI está instalado
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI no está instalado."
    echo "📦 Instalando Vercel CLI..."
    npm install -g vercel
fi

# Limpiar cache y dependencias
echo "🧹 Limpiando cache..."
rm -rf .next
rm -rf node_modules/.cache

# Instalar dependencias
echo "📦 Instalando dependencias..."
npm install

# Ejecutar build local para verificar
echo "🔨 Ejecutando build local..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build local exitoso!"
    
    # Desplegar a Vercel
    echo "🌐 Desplegando a Vercel..."
    vercel --prod
    
    if [ $? -eq 0 ]; then
        echo "🎉 ¡Despliegue exitoso!"
        echo "📋 Próximos pasos:"
        echo "   1. Configura tu dominio personalizado en Vercel Dashboard"
        echo "   2. Actualiza los registros DNS"
        echo "   3. Verifica que el chat de Tawk.to funcione"
        echo "   4. Prueba todas las páginas"
        echo ""
        echo "🔗 Enlaces útiles:"
        echo "   • Vercel Dashboard: https://vercel.com/dashboard"
        echo "   • Tawk.to Dashboard: https://dashboard.tawk.to"
        echo "   • Documentación: ./DEPLOYMENT.md"
    else
        echo "❌ Error en el despliegue a Vercel"
        exit 1
    fi
else
    echo "❌ Error en el build local"
    exit 1
fi

echo "================================================"
echo "✨ Proceso completado!"