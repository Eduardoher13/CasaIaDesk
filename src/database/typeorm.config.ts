import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { entities } from './entities';
import { parsePgDatabaseUrl } from './pg-ssl';

export function buildTypeOrmConfig(
  configService: ConfigService,
): TypeOrmModuleOptions {
  const databaseUrl = configService.get<string>('DATABASE_URL');
  const synchronize = configService.get<string>('DB_SYNCHRONIZE') === 'true';
  const logging = configService.get<string>('DB_LOGGING') === 'true';
  const dbSsl = configService.get<string>('DB_SSL');

  const common = {
    type: 'postgres' as const,
    entities,
    synchronize,
    logging,
    autoLoadEntities: true,
  };

  if (databaseUrl) {
    const connection = parsePgDatabaseUrl(databaseUrl, dbSsl);
    return {
      ...common,
      host: connection.host,
      port: connection.port,
      username: connection.username,
      password: connection.password,
      database: connection.database,
      ssl: connection.ssl,
      extra: connection.extra,
    };
  }

  const ssl =
    dbSsl === 'true' ? ({ rejectUnauthorized: false } as const) : false;

  return {
    ...common,
    host: configService.get<string>('DB_HOST', 'localhost'),
    port: configService.get<number>('DB_PORT', 5432),
    username: configService.get<string>('DB_USERNAME', 'postgres'),
    password: configService.get<string>('DB_PASSWORD', 'postgres'),
    database: configService.get<string>('DB_DATABASE', 'casa_ia_desk'),
    ssl,
    extra: ssl ? { ssl } : {},
  };
};
