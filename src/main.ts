import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { INestApplication } from '@nestjs/common';
import { AppModule } from './app.module';

async function listenOnPort(
  app: INestApplication,
  preferredPort: number,
  allowFallback: boolean,
  host: string,
): Promise<number> {
  const maxAttempts = allowFallback ? 20 : 1;

  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    const port = preferredPort + attempt;
    try {
      await app.listen(port, host);
      if (attempt > 0) {
        console.warn(
          `Puerto ${preferredPort} ocupado; API escuchando en ${port}.`,
        );
      }
      return port;
    } catch (err) {
      const error = err as NodeJS.ErrnoException;
      if (error.code !== 'EADDRINUSE' || attempt === maxAttempts - 1) {
        throw err;
      }
    }
  }

  throw new Error(`No se pudo usar el puerto ${preferredPort}`);
}

function resolveCorsOrigin(configService: ConfigService): boolean | string[] {
  const raw = configService.get<string>('CORS_ORIGIN');
  if (!raw || raw.trim() === '' || raw.trim() === '*') {
    // Sin CORS_ENV reflejamos cualquier origen (útil para apps móviles sin
    // origin fijo). Define orígenes concretos para restringir en web.
    return true;
  }

  return raw
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);
}

function checkProductionConfig(configService: ConfigService) {
  // Avisos NO bloqueantes: el arranque continúa aunque falten valores ideales.
  const jwtSecret = configService.get<string>('JWT_SECRET');
  if (!jwtSecret || jwtSecret === 'casaia-dev-secret') {
    console.warn(
      '⚠️  JWT_SECRET usa el valor de desarrollo. Para mayor seguridad define ' +
        'uno propio (p. ej. `openssl rand -hex 32`).',
    );
  }

  if (configService.get<string>('DB_SYNCHRONIZE') === 'true') {
    console.warn(
      '⚠️  DB_SYNCHRONIZE=true en producción: riesgo de pérdida de datos. ' +
        'Úsalo solo para el primer arranque y luego ponlo en false.',
    );
  }
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableShutdownHooks();

  const configService = app.get(ConfigService);
  const preferredPort = Number(configService.get<string>('PORT', '8001'));
  const host = configService.get<string>('HOST', '0.0.0.0');
  const isDev = configService.get<string>('NODE_ENV') !== 'production';

  if (!isDev) {
    checkProductionConfig(configService);
  }

  app.enableCors({
    origin: resolveCorsOrigin(configService),
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  if (!Number.isInteger(preferredPort) || preferredPort < 1) {
    throw new Error(`Invalid PORT: ${configService.get('PORT')}`);
  }

  // En producción no probamos puertos alternativos: el puerto lo fija el host.
  const port = await listenOnPort(app, preferredPort, isDev, host);
  console.log(`API running on http://localhost:${port}`);
  if (isDev && host === '0.0.0.0') {
    console.log(`Red local (celular): http://<IP-de-tu-Mac>:${port}`);
  }
}

bootstrap().catch((err: unknown) => {
  console.error('Fatal error during bootstrap:', err);
  process.exit(1);
});
