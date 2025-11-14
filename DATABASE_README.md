# Sistema de Gestión de Fotos y Planos - GL Agrimensura

## 🚀 Configuración Completada

### ✅ Base de Datos (Neon PostgreSQL)
- **3 tablas creadas**:
  - `service_photos`: Fotos de cada servicio
  - `planos`: Planos y archivos técnicos
  - `gallery_items`: Galería general

### 📦 Stack Tecnológico
- **Base de Datos**: Neon PostgreSQL (serverless)
- **ORM**: Drizzle ORM
- **Storage**: Uploadthing (para archivos)
- **API**: Next.js App Router

## 🔑 Configuración Requerida

### 1. Uploadthing (Almacenamiento de Archivos)

1. Regístrate en: https://uploadthing.com
2. Crea una nueva app
3. Copia el token de API
4. Agrégalo a `.env.local`:
```bash
UPLOADTHING_TOKEN=tu_token_aqui
```

## 📋 APIs Disponibles

### Fotos (`/api/photos`)
- **GET** `?servicio=mensura` - Obtener fotos de un servicio
- **POST** - Crear nueva foto
  ```json
  {
    "servicioSlug": "mensura",
    "title": "Título",
    "description": "Descripción",
    "imageUrl": "https://...",
    "orden": 0
  }
  ```
- **DELETE** `?id=1` - Eliminar foto

### Planos (`/api/planos`)
- **GET** `?servicio=mensura` - Obtener planos de un servicio
- **POST** - Crear nuevo plano
  ```json
  {
    "servicioSlug": "mensura",
    "title": "Plano Partida 123",
    "description": "Descripción",
    "fileUrl": "https://...",
    "fileType": "pdf",
    "orden": 0
  }
  ```
- **DELETE** `?id=1` - Eliminar plano

## 🎨 Panel de Administración

Accede a: **http://localhost:3000/admin**

### Funcionalidades:
- ✅ Subir fotos de servicios
- ✅ Subir planos (PDF o imágenes)
- ✅ Organizar por servicio
- ✅ Gestionar descripciones

## 🗄️ Estructura de la Base de Datos

### service_photos
```sql
- id (serial)
- servicio_slug (varchar) - mensura, usucapion, subdivision, ph, topografia, amojonamientos
- title (varchar)
- description (text)
- image_url (text)
- thumbnail_url (text)
- orden (integer)
- created_at (timestamp)
- updated_at (timestamp)
```

### planos
```sql
- id (serial)
- servicio_slug (varchar)
- title (varchar)
- description (text)
- file_url (text)
- file_type (varchar) - pdf, jpg, png
- thumbnail_url (text)
- orden (integer)
- created_at (timestamp)
- updated_at (timestamp)
```

### gallery_items
```sql
- id (serial)
- category (varchar)
- title (varchar)
- description (text)
- image_url (text)
- thumbnail_url (text)
- orden (integer)
- created_at (timestamp)
- updated_at (timestamp)
```

## 🔄 Comandos Útiles

```bash
# Generar migraciones
npm run db:generate

# Aplicar migraciones
npm run db:migrate

# Push directo a la DB
npm run db:push

# Abrir Drizzle Studio (UI para ver la DB)
npm run db:studio

# Ejecutar migración manual
npx tsx db/migrate.ts
```

## 📱 Próximos Pasos

1. **Registrarse en Uploadthing**: https://uploadthing.com
2. **Agregar el token** en `.env.local`
3. **Acceder al admin**: http://localhost:3000/admin
4. **Subir fotos y planos** de ejemplo
5. **Integrar en las páginas** de servicios

## 💡 Uso en Componentes

### Obtener fotos de un servicio:
```typescript
const response = await fetch('/api/photos?servicio=mensura');
const { photos } = await response.json();
```

### Obtener planos de un servicio:
```typescript
const response = await fetch('/api/planos?servicio=mensura');
const { planos } = await response.json();
```

## 🔒 Seguridad

⚠️ **IMPORTANTE**: El panel `/admin` está público actualmente. 
Para producción, deberías agregar autenticación (NextAuth, Clerk, etc.)

## 📞 Soporte

Cualquier duda, consulta la documentación:
- Neon: https://neon.tech/docs
- Drizzle: https://orm.drizzle.team
- Uploadthing: https://docs.uploadthing.com
