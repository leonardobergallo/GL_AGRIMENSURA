import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { servicePhotos } from '@/db/schema';
import { eq } from 'drizzle-orm';

// GET - Obtener fotos de un servicio
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const servicioSlug = searchParams.get('servicio');

  if (!servicioSlug) {
    return NextResponse.json({ error: 'Servicio no especificado' }, { status: 400 });
  }

  try {
    const photos = await db
      .select()
      .from(servicePhotos)
      .where(eq(servicePhotos.servicioSlug, servicioSlug))
      .orderBy(servicePhotos.orden);

    return NextResponse.json({ photos });
  } catch (error) {
    console.error('Error al obtener fotos:', error);
    return NextResponse.json({ error: 'Error al obtener fotos' }, { status: 500 });
  }
}

// POST - Crear nueva foto
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { servicioSlug, title, description, imageUrl, thumbnailUrl, orden } = body;

    if (!servicioSlug || !title || !imageUrl) {
      return NextResponse.json(
        { error: 'Faltan campos requeridos: servicioSlug, title, imageUrl' },
        { status: 400 }
      );
    }

    const [photo] = await db
      .insert(servicePhotos)
      .values({
        servicioSlug,
        title,
        description,
        imageUrl,
        thumbnailUrl,
        orden: orden || 0,
      })
      .returning();

    return NextResponse.json({ photo }, { status: 201 });
  } catch (error) {
    console.error('Error al crear foto:', error);
    return NextResponse.json({ error: 'Error al crear foto' }, { status: 500 });
  }
}

// DELETE - Eliminar foto
export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ error: 'ID no especificado' }, { status: 400 });
  }

  try {
    await db.delete(servicePhotos).where(eq(servicePhotos.id, parseInt(id)));
    return NextResponse.json({ message: 'Foto eliminada' });
  } catch (error) {
    console.error('Error al eliminar foto:', error);
    return NextResponse.json({ error: 'Error al eliminar foto' }, { status: 500 });
  }
}
