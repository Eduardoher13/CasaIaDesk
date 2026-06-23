/** SSL para Postgres administrado (DigitalOcean, Render, Neon, etc.). */
export function resolvePgSsl(options: {
  databaseUrl?: string;
  dbSsl?: string;
}): false | { rejectUnauthorized: false } {
  const { databaseUrl, dbSsl } = options;
  const wantsSsl =
    dbSsl === 'true' ||
    Boolean(databaseUrl && /sslmode=(require|verify-ca|verify-full)/i.test(databaseUrl));

  return wantsSsl ? { rejectUnauthorized: false } : false;
}
