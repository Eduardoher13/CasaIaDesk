/**
 * Crea/actualiza tablas en la BD apuntada por DATABASE_URL (o DB_*).
 * Útil para el primer arranque en producción cuando DB_SYNCHRONIZE=false.
 *
 *   npm run db:schema
 */
import { config } from 'dotenv';
import { DataSource } from 'typeorm';
import { entities } from './entities';
import { parsePgDatabaseUrl } from './pg-ssl';

config();

async function main() {
  const databaseUrl = process.env.DATABASE_URL;

  const base = databaseUrl
    ? (() => {
        const connection = parsePgDatabaseUrl(databaseUrl, process.env.DB_SSL);
        return {
          type: 'postgres' as const,
          host: connection.host,
          port: connection.port,
          username: connection.username,
          password: connection.password,
          database: connection.database,
          ssl: connection.ssl,
          extra: connection.extra,
        };
      })()
    : {
        type: 'postgres' as const,
        host: process.env.DB_HOST ?? 'localhost',
        port: Number(process.env.DB_PORT ?? 5432),
        username: process.env.DB_USERNAME ?? 'postgres',
        password: process.env.DB_PASSWORD ?? 'postgres',
        database: process.env.DB_DATABASE ?? 'casa_ia_desk',
        ssl:
          process.env.DB_SSL === 'true'
            ? ({ rejectUnauthorized: false } as const)
            : false,
      };

  const dataSource = new DataSource({
    ...base,
    entities,
    synchronize: true,
  });

  console.log('Sincronizando esquema (creando tablas)...');
  await dataSource.initialize();
  await dataSource.destroy();
  console.log('Esquema listo.');
}

main().catch((err: unknown) => {
  console.error(err);
  process.exit(1);
});
