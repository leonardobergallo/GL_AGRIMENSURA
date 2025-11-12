import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

export const ourFileRouter = {
  // Endpoint para subir fotos de servicios
  servicePhotos: f({ image: { maxFileSize: "4MB", maxFileCount: 10 } })
    .onUploadComplete(async ({ file }) => {
      console.log("Foto subida:", file.url);
      return { url: file.url };
    }),

  // Endpoint para subir planos (PDFs o imágenes)
  planos: f({ 
    pdf: { maxFileSize: "16MB", maxFileCount: 5 },
    image: { maxFileSize: "8MB", maxFileCount: 5 }
  })
    .onUploadComplete(async ({ file }) => {
      console.log("Plano subido:", file.url);
      return { url: file.url };
    }),

  // Endpoint para galería general
  galleryImages: f({ image: { maxFileSize: "4MB", maxFileCount: 20 } })
    .onUploadComplete(async ({ file }) => {
      console.log("Imagen de galería subida:", file.url);
      return { url: file.url };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
