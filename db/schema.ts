import { pgTable, text, timestamp, serial, varchar, integer } from 'drizzle-orm/pg-core';

// Tabla para almacenar fotos de servicios
export const servicePhotos = pgTable('service_photos', {
  id: serial('id').primaryKey(),
  servicioSlug: varchar('servicio_slug', { length: 50 }).notNull(), // mensura, usucapion, etc.
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description'),
  imageUrl: text('image_url').notNull(), // URL de la imagen en storage
  thumbnailUrl: text('thumbnail_url'), // URL del thumbnail
  orden: integer('orden').default(0), // Para ordenar las fotos
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Tabla para almacenar planos (PDFs o imágenes)
export const planos = pgTable('planos', {
  id: serial('id').primaryKey(),
  servicioSlug: varchar('servicio_slug', { length: 50 }).notNull(),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description'),
  fileUrl: text('file_url').notNull(), // URL del archivo en storage
  fileType: varchar('file_type', { length: 20 }).notNull(), // pdf, jpg, png
  thumbnailUrl: text('thumbnail_url'), // Preview del plano
  orden: integer('orden').default(0),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Tabla para almacenar galería general
export const galleryItems = pgTable('gallery_items', {
  id: serial('id').primaryKey(),
  category: varchar('category', { length: 50 }).notNull(), // mensura, topografia, obras, etc.
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description'),
  imageUrl: text('image_url').notNull(),
  thumbnailUrl: text('thumbnail_url'),
  orden: integer('orden').default(0),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});
