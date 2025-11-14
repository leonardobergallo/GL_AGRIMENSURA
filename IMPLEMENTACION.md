# GL Agrimensura - Sitio Web

## 🚀 Estado de Implementación

### ✅ Completado

1. **Páginas de Servicios** - 6 mini-landings creadas:
   - `/servicios/mensura`
   - `/servicios/usucapion`
   - `/servicios/subdivision`
   - `/servicios/ph`
   - `/servicios/topografia`
   - `/servicios/amojonamientos`

2. **Componentes Funcionales**:
   - Hero con imagen de fondo y CTAs
   - Formularios dinámicos por servicio
   - Visor de planos (PDF/imágenes)
   - Botón flotante de WhatsApp
   - Sistema de envío de emails

3. **Diseño y Branding**:
   - Tipografías Montserrat + Poppins
   - Colores optimizados (Verde WhatsApp + acentos)
   - Metadata y SEO básico

---

## 📋 Tareas Pendientes (REQUIEREN TU ACCIÓN)

### 🔴 URGENTE - Información Requerida:

#### 1. **Número de WhatsApp**
Editar en los siguientes archivos y reemplazar `5492214000000` por tu número real:
- `components/whatsapp-float.tsx` (línea 8)
- `components/service-page/service-hero.tsx` (línea 16)
- `components/service-page/service-form.tsx` (línea 98)
- `app/api/contact/route.ts` (línea 116)

#### 2. **Email de Contacto**
Editar `app/api/contact/route.ts`:
- Línea 67: Cambiar `from` por tu dominio verificado en Resend
- Línea 68: Cambiar `to` por tu email real
- Línea 78: Cambiar `from` por tu dominio verificado

#### 3. **Variables de Entorno**
Crear archivo `.env.local` basado en `.env.example`:
```bash
cp .env.example .env.local
```
Luego editar `.env.local` con tus credenciales reales.

#### 4. **Configurar Resend**
1. Crear cuenta en [resend.com](https://resend.com)
2. Verificar tu dominio
3. Obtener API Key
4. Agregar a `.env.local`

#### 5. **Imágenes de Servicios**
Agregar imágenes en `/public/servicios/`:
- `mensura.jpg` - Foto de trabajo de mensura
- `usucapion.jpg` - Imagen relacionada a usucapión
- `subdivision.jpg` - Terreno o plano de subdivisión
- `ph.jpg` - Edificio o propiedad horizontal
- `topografia.jpg` - Equipo GPS o trabajo topográfico
- `amojonamientos.jpg` - Mojones o demarcación

**Formato recomendado**: 1200x800px, WebP optimizado

#### 6. **Planos de Ejemplo**
Subir planos en las carpetas correspondientes:
- `/public/planos/mensura/`
- `/public/planos/usucapion/`
- `/public/planos/subdivision/`
- `/public/planos/ph/`
- `/public/planos/topografia/`
- `/public/planos/amojonamientos/`

Luego actualizar `lib/servicios-data.ts` agregando los planos al array `planos` de cada servicio.

#### 7. **Favicon**
Agregar logo en `/public/`:
- `favicon.ico`
- `icon.png` (192x192)
- `apple-icon.png` (180x180)

---

## 🛠️ Instalación y Desarrollo

### Instalar Dependencias
```bash
npm install
```

### Ejecutar en Desarrollo
```bash
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000)

### Build de Producción
```bash
npm run build
npm start
```

---

## 📦 Dependencias Agregadas

- `react-hook-form` - Manejo de formularios
- `@hookform/resolvers` - Validación con Zod
- `zod` - Esquemas de validación
- `react-pdf` - Visor de PDFs
- `resend` - Servicio de emails

---

## 🎨 Personalización

### Colores
Los colores principales se pueden ajustar en `app/globals.css`:
- `--primary`: Color principal (actualmente azul)
- `--accent`: Color de acento (actualmente dorado)

### Tipografías
Configuradas en `app/layout.tsx`:
- **Montserrat**: Títulos y headings
- **Poppins**: Texto del cuerpo

### Textos de Servicios
Editar descripciones en `lib/servicios-data.ts`

---

## 📱 Funcionalidades

### Envío por WhatsApp
- Mensaje preformateado con datos del formulario
- Abre WhatsApp Web/App automáticamente
- Sin necesidad de backend

### Envío por Email
- Doble email: al agrimensor + confirmación al cliente
- HTML estilizado
- Respuesta automática
- Requiere configuración de Resend

### Visor de Planos
- Soporta PDF y imágenes
- Modal de visualización
- Botón de descarga
- Miniaturas en grid

---

## 🔒 Seguridad

**NUNCA commitear el archivo `.env.local`** (ya está en `.gitignore`)

---

## 📊 Próximos Pasos Recomendados

1. ✅ Agregar todas las imágenes y planos
2. ✅ Configurar Resend y emails
3. ✅ Actualizar números de WhatsApp
4. ⬜ Optimizar galería con categorías
5. ⬜ Agregar más contenido SEO
6. ⬜ Implementar Google Analytics
7. ⬜ Agregar testimonios de clientes
8. ⬜ Sistema de blog/noticias

---

## 🐛 Troubleshooting

### Error de compilación con 'resend'
Ejecutar:
```bash
npm install resend
```

### Imágenes no se muestran
Verificar que existen en `/public/servicios/`

### Formularios no envían
1. Verificar `.env.local` configurado
2. Verificar Resend API Key válida
3. Verificar dominio verificado en Resend

---

## 📞 Contacto

**Ing. Gabriel Lucero**  
GL Agrimensura  
La Plata, Buenos Aires  

---

## 📝 Licencia

© 2025 GL Agrimensura. Todos los derechos reservados.
