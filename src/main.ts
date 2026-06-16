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

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableShutdownHooks();

  app.enableCors({
    origin: true,
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

  const configService = app.get(ConfigService);
  const preferredPort = Number(configService.get<string>('PORT', '8001'));
  const host = configService.get<string>('HOST', '0.0.0.0');
  const isDev = configService.get<string>('NODE_ENV') !== 'production';

  if (!Number.isInteger(preferredPort) || preferredPort < 1) {
    throw new Error(`Invalid PORT: ${configService.get('PORT')}`);
  }

  const port = await listenOnPort(app, preferredPort, isDev, host);
  console.log(`API running on http://localhost:${port}`);
  if (host === '0.0.0.0') {
    console.log(`Red local (celular): http://<IP-de-tu-Mac>:${port}`);
  }
}

bootstrap();
