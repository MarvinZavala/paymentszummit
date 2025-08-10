# Zummit Payments - Merchant Services Platform

Una plataforma completa para servicios de procesamiento de pagos con tarjetas de crédito, diseñada para ayudar a los comerciantes a ahorrar hasta un 40% en comisiones.

## 🚀 Características Principales

- **Formulario de Lead Generation**: Proceso paso a paso para capturar información de prospectos
- **Sitio Web Completo**: Páginas de pricing, productos, información de la empresa y recursos
- **Integración con Calendly**: Sistema de citas automatizado
- **Diseño Responsivo**: Optimizado para dispositivos móviles y desktop
- **Chat Live**: Widget de chat integrado para conversión

## 🛠️ Stack Tecnológico

- **Framework**: Next.js 15.4.5 con React 19.1.0
- **Styling**: Tailwind CSS 3.4.0
- **TypeScript**: Soporte completo con tipos
- **Build Tool**: Turbopack para desarrollo rápido

## 📁 Estructura del Proyecto

```
paymentszummit/
├── src/
│   ├── app/
│   │   ├── page.tsx              # Formulario principal (landing page)
│   │   ├── dashboard/            # Dashboard principal después del formulario
│   │   ├── pricing/              # Página de precios
│   │   ├── products/             # Payment Solutions & Products
│   │   ├── company/              # Información de la empresa
│   │   ├── resources/            # Recursos y documentación
│   │   ├── contact/              # Página de contacto
│   │   └── components/           # Componentes reutilizables
│   └── lib/                      # Utilidades y configuraciones
├── public/                       # Assets estáticos
└── docs/                        # Documentación del proyecto
```

## 🔧 Instalación y Configuración

### Prerrequisitos
- Node.js 18+ 
- npm o yarn

### Instalación
```bash
# Clonar el repositorio
git clone <repository-url>
cd paymentszummit

# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev
```

La aplicación estará disponible en `http://localhost:3000`

## 📱 Funcionalidades

### 1. Formulario Multi-paso
- **Paso 1**: Bienvenida y call-to-action
- **Paso 2**: Verificación de ubicación del negocio (USA)
- **Paso 3**: Volumen de procesamiento mensual
- **Paso 4**: Nombre del negocio
- **Paso 5**: Información personal (nombre completo)
- **Paso 6**: Información de contacto (teléfono y email)

### 2. Navegación Principal
Después de completar el formulario, los usuarios acceden a:
- **Payment Solutions**: Soluciones de pago disponibles
- **Products**: Catálogo de productos y servicios
- **Pricing**: Planes y precios transparentes
- **Company**: Historia, misión y equipo
- **Resources**: Guías, artículos y recursos útiles
- **Contact Us**: Formulario de contacto y información

### 3. Integración con Calendly
- Widget embebido para agendar citas
- Integración automática con CRM
- Notificaciones por email

## 🎨 Diseño y UX

- **Tema**: Gradientes azul oscuro a slate con acentos dorados/naranjas
- **Tipografía**: Moderna y legible con jerarquía clara
- **Animaciones**: Transiciones suaves y efectos hover
- **Responsivo**: Diseño móvil-first con breakpoints optimizados

## 🔌 Recomendaciones de Backend

### Opción 1: Supabase (Recomendado)
- **Pros**: Setup rápido, Auth integrado, Base de datos PostgreSQL, APIs auto-generadas
- **Uso**: Almacenar leads, gestión de usuarios, analytics
- **Costo**: Plan gratuito generoso, escalable

### Opción 2: Firebase
- **Pros**: Integración con Google, Realtime Database, Auth, Hosting
- **Uso**: Para aplicaciones que requieren tiempo real
- **Costo**: Pay-as-you-go

### Opción 3: Node.js + Express + MongoDB
- **Pros**: Control total, flexible, gran ecosistema
- **Uso**: Para necesidades específicas o integraciones complejas
- **Costo**: Depende del hosting (Vercel, Railway, etc.)

### Opción Recomendada: Supabase
```bash
npm install @supabase/supabase-js
```

**Configuración básica:**
- Tabla `leads` para formularios
- Tabla `appointments` para Calendly
- Row Level Security (RLS) para seguridad
- APIs automáticas para CRUD operations

## 📊 Analytics y Tracking

### Métricas Clave a Implementar:
- Conversión por paso del formulario
- Tiempo de abandono
- Fuentes de tráfico
- Citas agendadas vs completadas

### Tools Recomendados:
- Google Analytics 4
- Meta Pixel (Facebook/Instagram ads)
- Hotjar para heatmaps
- Mixpanel para eventos específicos

## 🚀 Scripts Disponibles

```bash
npm run dev      # Desarrollo con Turbopack
npm run build    # Build de producción
npm run start    # Servidor de producción
npm run lint     # Linting con ESLint
```

## 🔐 Variables de Entorno

Crear archivo `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
CALENDLY_ACCESS_TOKEN=your_calendly_token
GOOGLE_ANALYTICS_ID=your_ga_id
```

## 📈 Roadmap de Desarrollo

### Fase 1: Básico ✅
- [x] Formulario multi-paso
- [x] Diseño responsivo
- [x] Estructura base

### Fase 2: Sitio Completo 🔄
- [ ] Páginas principales
- [ ] Navegación completa
- [ ] Integración Calendly
- [ ] Backend con Supabase

### Fase 3: Optimización 📋
- [ ] SEO completo
- [ ] Analytics implementado
- [ ] A/B testing
- [ ] Performance optimization

### Fase 4: Avanzado 📋
- [ ] CRM integrado
- [ ] Email marketing automation
- [ ] Live chat avanzado
- [ ] Dashboard de admin

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📞 Contacto

- **Phone**: 833.480.7829
- **Website**: En construcción
- **Support**: Próximamente

## 📄 Licencia

Este proyecto es privado y propietario.