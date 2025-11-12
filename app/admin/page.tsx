"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UploadButton } from "@/lib/uploadthing";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const servicios = [
  { slug: "mensura", nombre: "Mensuras" },
  { slug: "usucapion", nombre: "Usucapión" },
  { slug: "subdivision", nombre: "Subdivisión" },
  { slug: "ph", nombre: "Propiedad Horizontal" },
  { slug: "topografia", nombre: "Topografía" },
  { slug: "amojonamientos", nombre: "Amojonamientos" },
];

export default function AdminPage() {
  const [selectedServicio, setSelectedServicio] = useState("");
  const [photoTitle, setPhotoTitle] = useState("");
  const [photoDescription, setPhotoDescription] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [planoTitle, setPlanoTitle] = useState("");
  const [planoDescription, setPlanoDescription] = useState("");
  const [planoUrl, setPlanoUrl] = useState("");
  const [planoType, setPlanoType] = useState("");

  const handleSavePhoto = async () => {
    if (!selectedServicio || !photoTitle || !photoUrl) {
      alert("Por favor completa todos los campos requeridos");
      return;
    }

    try {
      const response = await fetch("/api/photos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          servicioSlug: selectedServicio,
          title: photoTitle,
          description: photoDescription,
          imageUrl: photoUrl,
        }),
      });

      if (response.ok) {
        alert("Foto guardada exitosamente!");
        setPhotoTitle("");
        setPhotoDescription("");
        setPhotoUrl("");
      } else {
        alert("Error al guardar la foto");
      }
    } catch (error) {
      console.error(error);
      alert("Error al guardar la foto");
    }
  };

  const handleSavePlano = async () => {
    if (!selectedServicio || !planoTitle || !planoUrl || !planoType) {
      alert("Por favor completa todos los campos requeridos");
      return;
    }

    try {
      const response = await fetch("/api/planos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          servicioSlug: selectedServicio,
          title: planoTitle,
          description: planoDescription,
          fileUrl: planoUrl,
          fileType: planoType,
        }),
      });

      if (response.ok) {
        alert("Plano guardado exitosamente!");
        setPlanoTitle("");
        setPlanoDescription("");
        setPlanoUrl("");
        setPlanoType("");
      } else {
        alert("Error al guardar el plano");
      }
    } catch (error) {
      console.error(error);
      alert("Error al guardar el plano");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">
          Panel de Administración
        </h1>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Seleccionar Servicio</CardTitle>
          </CardHeader>
          <CardContent>
            <Select value={selectedServicio} onValueChange={setSelectedServicio}>
              <SelectTrigger>
                <SelectValue placeholder="Selecciona un servicio" />
              </SelectTrigger>
              <SelectContent>
                {servicios.map((servicio) => (
                  <SelectItem key={servicio.slug} value={servicio.slug}>
                    {servicio.nombre}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        <Tabs defaultValue="photos" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="photos">Fotos</TabsTrigger>
            <TabsTrigger value="planos">Planos</TabsTrigger>
          </TabsList>

          <TabsContent value="photos">
            <Card>
              <CardHeader>
                <CardTitle>Subir Foto</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="photo-upload">Archivo</Label>
                  <div className="mt-2">
                    <UploadButton
                      endpoint="servicePhotos"
                      onClientUploadComplete={(res: any) => {
                        if (res?.[0]?.url) {
                          setPhotoUrl(res[0].url);
                          alert("Imagen subida exitosamente!");
                        }
                      }}
                      onUploadError={(error: Error) => {
                        alert(`Error: ${error.message}`);
                      }}
                    />
                  </div>
                  {photoUrl && (
                    <div className="mt-2">
                      <p className="text-sm text-green-600">✓ Imagen subida</p>
                      <p className="text-xs text-gray-500 truncate">{photoUrl}</p>
                    </div>
                  )}
                </div>

                <div>
                  <Label htmlFor="photo-title">Título *</Label>
                  <Input
                    id="photo-title"
                    value={photoTitle}
                    onChange={(e) => setPhotoTitle(e.target.value)}
                    placeholder="Ej: Mensura en zona urbana"
                  />
                </div>

                <div>
                  <Label htmlFor="photo-description">Descripción</Label>
                  <Textarea
                    id="photo-description"
                    value={photoDescription}
                    onChange={(e) => setPhotoDescription(e.target.value)}
                    placeholder="Descripción opcional de la foto"
                  />
                </div>

                <Button
                  onClick={handleSavePhoto}
                  disabled={!selectedServicio || !photoTitle || !photoUrl}
                  className="w-full"
                >
                  Guardar Foto
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="planos">
            <Card>
              <CardHeader>
                <CardTitle>Subir Plano</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="plano-upload">Archivo (PDF o Imagen)</Label>
                  <div className="mt-2">
                    <UploadButton
                      endpoint="planos"
                      onClientUploadComplete={(res: any) => {
                        if (res?.[0]?.url) {
                          setPlanoUrl(res[0].url);
                          const ext = res[0].url.split(".").pop()?.toLowerCase();
                          setPlanoType(ext === "pdf" ? "pdf" : "image");
                          alert("Plano subido exitosamente!");
                        }
                      }}
                      onUploadError={(error: Error) => {
                        alert(`Error: ${error.message}`);
                      }}
                    />
                  </div>
                  {planoUrl && (
                    <div className="mt-2">
                      <p className="text-sm text-green-600">✓ Archivo subido</p>
                      <p className="text-xs text-gray-500 truncate">{planoUrl}</p>
                    </div>
                  )}
                </div>

                <div>
                  <Label htmlFor="plano-title">Título *</Label>
                  <Input
                    id="plano-title"
                    value={planoTitle}
                    onChange={(e) => setPlanoTitle(e.target.value)}
                    placeholder="Ej: Plano de mensura Partida 123456"
                  />
                </div>

                <div>
                  <Label htmlFor="plano-description">Descripción</Label>
                  <Textarea
                    id="plano-description"
                    value={planoDescription}
                    onChange={(e) => setPlanoDescription(e.target.value)}
                    placeholder="Descripción opcional del plano"
                  />
                </div>

                <Button
                  onClick={handleSavePlano}
                  disabled={!selectedServicio || !planoTitle || !planoUrl}
                  className="w-full"
                >
                  Guardar Plano
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
