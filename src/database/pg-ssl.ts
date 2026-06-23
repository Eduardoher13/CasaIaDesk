import { parse } from 'pg-connection-string';

export type PgSslConfig = false | { rejectUnauthorized: false };

export interface PgConnectionParams {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
  ssl: PgSslConfig;
  extra: Record<string, unknown>;
}

/** Algunos hosts incluyen comillas literales al pegar el valor del env. */
export function trimEnvValue(value: string): string {
  return value.trim().replace(/^["']|["']$/g, '');
}

/** Quita sslmode de la URL para que pg no fuerce verificación estricta del certificado. */
export function stripSslModeFromUrl(databaseUrl: string): string {
  return databaseUrl
    .replace(/([?&])sslmode=[^&]*&?/g, (_, sep: string) => (sep === '?' ? '?' : sep))
    .replace(/\?&/, '?')
    .replace(/[?&]$/, '');
}

/** SSL para Postgres administrado (DigitalOcean, Render, Neon, etc.). */
export function resolvePgSsl(options: {
  databaseUrl?: string;
  dbSsl?: string;
}): PgSslConfig {
  const { databaseUrl, dbSsl } = options;

  const wantsSsl =
    dbSsl === 'true' ||
    Boolean(
      databaseUrl &&
        (/sslmode=(require|verify-ca|verify-full)/i.test(databaseUrl) ||
          /\.ondigitalocean\.com|\.render\.com|neon\.tech|supabase\.co/i.test(
            databaseUrl,
          )),
    );

  return wantsSsl ? { rejectUnauthorized: false } : false;
}

/**
 * Parsea DATABASE_URL en campos sueltos (sin `url`).
 * Evita que pg re-parseé sslmode=require y sobrescriba rejectUnauthorized.
 */
export function parsePgDatabaseUrl(
  databaseUrl: string,
  dbSsl?: string,
): PgConnectionParams {
  const trimmed = trimEnvValue(databaseUrl);
  const cleanUrl = stripSslModeFromUrl(trimmed);
  const parsed = parse(cleanUrl);
  const ssl = resolvePgSsl({ databaseUrl: trimmed, dbSsl });

  if (!parsed.host) {
    throw new Error(
      'DATABASE_URL inválida: no se pudo resolver el host. ' +
        'Si la contraseña contiene @, # o / codifícala (ej. @ → %40).',
    );
  }

  const sslExtra = ssl ? { ssl } : {};

  return {
    host: parsed.host,
    port: parsed.port ? Number(parsed.port) : 5432,
    username: parsed.user ?? '',
    password: parsed.password ?? '',
    database: parsed.database ?? '',
    ssl,
    extra: sslExtra,
  };
}
