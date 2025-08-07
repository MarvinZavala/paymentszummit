# Despliegue de Zummit Payments en Vercel

## 📋 Pasos para Desplegar con Nuevo Dominio

### 1. Preparación del Proyecto

✅ **Proyecto ya configurado con:**
- Next.js 15.4.5 optimizado para producción
- Configuración de Vercel (`vercel.json`)
- Headers de seguridad configurados
- Optimizaciones de imágenes y CSS
- Chat en vivo Tawk.to integrado

### 2. Despliegue en Vercel

#### Opción A: Desde la Terminal (Recomendado)

```bash
# 1. Instalar Vercel CLI (si no lo tienes)
npm i -g vercel

# 2. Hacer login en Vercel
vercel login

# 3. Desplegar el proyecto
vercel

# 4. Seguir las instrucciones:
# - Set up and deploy? [Y/n] → Y
# - Which scope? → Seleccionar tu cuenta
# - Link to existing project? [y/N] → N (para nuevo proyecto)
# - What's your project's name? → zummit-payments
# - In which directory is your code located? → ./
```

#### Opción B: Desde Vercel Dashboard

1. Ve a [vercel.com](https://vercel.com)
2. Click en "New Project"
3. Importa tu repositorio de GitHub
4. Configura:
   - **Project Name**: `zummit-payments`
   - **Framework**: Next.js (detectado automáticamente)
   - **Root Directory**: `./`
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`

### 3. Configurar Dominio Personalizado

#### En Vercel Dashboard:

1. Ve a tu proyecto → **Settings** → **Domains**
2. Click en "Add Domain"
3. Ingresa tu dominio: `zummitpayments.com` (o el que prefieras)
4. Sigue las instrucciones para configurar DNS:

```
Tipo: CNAME
Nombre: www
Valor: cname.vercel-dns.com

Tipo: A
Nombre: @
Valor: 76.76.19.61
```

### 4. Variables de Entorno (Si las necesitas)

```bash
# En Vercel Dashboard → Settings → Environment Variables
NEXT_PUBLIC_SITE_URL=https://zummitpayments.com
NEXT_PUBLIC_TAWK_PROPERTY_ID=68928822205309192bd922e1
NEXT_PUBLIC_TAWK_WIDGET_ID=1j1u67i28
```

### 5. Comandos Útiles

```bash
# Ver deployments
vercel ls

# Ver logs del deployment
vercel logs [deployment-url]

# Deployment de producción
vercel --prod

# Eliminar proyecto
vercel remove [project-name]
```

### 6. Verificación Post-Despliegue

✅ **Checklist:**
- [ ] Sitio carga correctamente
- [ ] Chat de Tawk.to funciona
- [ ] Todas las páginas son accesibles
- [ ] Imágenes se cargan correctamente
- [ ] Headers de seguridad activos
- [ ] SSL/HTTPS funcionando
- [ ] Dominio personalizado configurado

### 7. Dominios Sugeridos para Zummit Payments

- `zummitpayments.com`
- `zummit-payments.com`
- `zummitpay.com`
- `payzummit.com`
- `zummitfinance.com`

### 8. Configuración DNS Típica

```
# Para dominio principal
Tipo: A
Nombre: @
Valor: 76.76.19.61

# Para subdominio www
Tipo: CNAME
Nombre: www
Valor: cname.vercel-dns.com

# Para verificación (opcional)
Tipo: TXT
Nombre: @
Valor: [valor proporcionado por Vercel]
```

## 🚀 Resultado Final

Tu sitio estará disponible en:
- URL temporal de Vercel: `https://zummit-payments-[hash].vercel.app`
- Tu dominio personalizado: `https://tudominio.com`

## 📞 Soporte

Si necesitas ayuda:
1. Revisa los logs en Vercel Dashboard
2. Verifica la configuración DNS
3. Contacta soporte de Vercel si es necesario

---

**Nota**: El chat de Tawk.to ya está configurado y funcionará automáticamente en el nuevo dominio.