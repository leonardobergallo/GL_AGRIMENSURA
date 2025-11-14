import { drizzle } from 'drizzle-orm/neon-serverless';
import { Pool } from '@neondatabase/serverless';
import { sql } from 'drizzle-orm';

const DATABASE_URL = process.env.DATABASE_URL || 'postgresql://neondb_owner:npg_Mboy4EHp0res@ep-restless-cake-adl0fx06-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require';

async function main() {
  console.log('🔄 Conectando a la base de datos...');
  
  const pool = new Pool({ connectionString: DATABASE_URL });
  const db = drizzle(pool);

  console.log('📝 Creando tablas...');

  // Crear tabla service_photos
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS service_photos (
      id SERIAL PRIMARY KEY,
      servicio_slug VARCHAR(50) NOT NULL,
      title VARCHAR(255) NOT NULL,
      description TEXT,
      image_url TEXT NOT NULL,
      thumbnail_url TEXT,
      orden INTEGER DEFAULT 0,
      created_at TIMESTAMP DEFAULT NOW() NOT NULL,
      updated_at TIMESTAMP DEFAULT NOW() NOT NULL
    )
  `);

  // Crear tabla planos
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS planos (
      id SERIAL PRIMARY KEY,
      servicio_slug VARCHAR(50) NOT NULL,
      title VARCHAR(255) NOT NULL,
      description TEXT,
      file_url TEXT NOT NULL,
      file_type VARCHAR(20) NOT NULL,
      thumbnail_url TEXT,
      orden INTEGER DEFAULT 0,
      created_at TIMESTAMP DEFAULT NOW() NOT NULL,
      updated_at TIMESTAMP DEFAULT NOW() NOT NULL
    )
  `);

  // Crear tabla gallery_items
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS gallery_items (
      id SERIAL PRIMARY KEY,
      category VARCHAR(50) NOT NULL,
      title VARCHAR(255) NOT NULL,
      description TEXT,
      image_url TEXT NOT NULL,
      thumbnail_url TEXT,
      orden INTEGER DEFAULT 0,
      created_at TIMESTAMP DEFAULT NOW() NOT NULL,
      updated_at TIMESTAMP DEFAULT NOW() NOT NULL
    )
  `);

  console.log('✅ Tablas creadas exitosamente!');
  
  await pool.end();
  process.exit(0);
}

main().catch((err) => {
  console.error('❌ Error:', err);
  process.exit(1);
});
