import { drizzle } from 'drizzle-orm/neon-serverless';
import { Pool } from '@neondatabase/serverless';
import * as schema from './schema';

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable is not set');
}

// Crear pool de conexiones
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

// Exportar instancia de Drizzle
export const db = drizzle(pool, { schema });

// Exportar schema para uso en queries
export { schema };
