import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { planos } from '@/db/schema';
import { eq } from 'drizzle-orm';

// GET - Obtener planos de un servicio
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const servicioSlug = searchParams.get('servicio');

  if (!servicioSlug) {
    return NextResponse.json({ error: 'Servicio no especificado' }, { status: 400 });
  }

  try {
    const planosData = await db
      .select()
      .from(planos)
      .where(eq(planos.servicioSlug, servicioSlug))
      .orderBy(planos.orden);

    return NextResponse.json({ planos: planosData });
  } catch (error) {
    console.error('Error al obtener planos:', error);
    return NextResponse.json({ error: 'Error al obtener planos' }, { status: 500 });
  }
}

// POST - Crear nuevo plano
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { servicioSlug, title, description, fileUrl, fileType, thumbnailUrl, orden } = body;

    if (!servicioSlug || !title || !fileUrl || !fileType) {
      return NextResponse.json(
        { error: 'Faltan campos requeridos: servicioSlug, title, fileUrl, fileType' },
        { status: 400 }
      );
    }

    const [plano] = await db
      .insert(planos)
      .values({
        servicioSlug,
        title,
        description,
        fileUrl,
        fileType,
        thumbnailUrl,
        orden: orden || 0,
      })
      .returning();

    return NextResponse.json({ plano }, { status: 201 });
  } catch (error) {
    console.error('Error al crear plano:', error);
    return NextResponse.json({ error: 'Error al crear plano' }, { status: 500 });
  }
}

// DELETE - Eliminar plano
export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ error: 'ID no especificado' }, { status: 400 });
  }

  try {
    await db.delete(planos).where(eq(planos.id, parseInt(id)));
    return NextResponse.json({ message: 'Plano eliminado' });
  } catch (error) {
    console.error('Error al eliminar plano:', error);
    return NextResponse.json({ error: 'Error al eliminar plano' }, { status: 500 });
  }
}
