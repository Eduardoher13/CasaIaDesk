"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const app_module_1 = require("./app.module");
async function listenOnPort(app, preferredPort, allowFallback, host) {
    const maxAttempts = allowFallback ? 20 : 1;
    for (let attempt = 0; attempt < maxAttempts; attempt++) {
        const port = preferredPort + attempt;
        try {
            await app.listen(port, host);
            if (attempt > 0) {
                console.warn(`Puerto ${preferredPort} ocupado; API escuchando en ${port}.`);
            }
            return port;
        }
        catch (err) {
            const error = err;
            if (error.code !== 'EADDRINUSE' || attempt === maxAttempts - 1) {
                throw err;
            }
        }
    }
    throw new Error(`No se pudo usar el puerto ${preferredPort}`);
}
function resolveCorsOrigin(configService) {
    const raw = configService.get('CORS_ORIGIN');
    if (!raw || raw.trim() === '' || raw.trim() === '*') {
        return true;
    }
    return raw
        .split(',')
        .map((origin) => origin.trim())
        .filter(Boolean);
}
function checkProductionConfig(configService) {
    const jwtSecret = configService.get('JWT_SECRET');
    if (!jwtSecret || jwtSecret === 'casaia-dev-secret') {
        console.warn('⚠️  JWT_SECRET usa el valor de desarrollo. Para mayor seguridad define ' +
            'uno propio (p. ej. `openssl rand -hex 32`).');
    }
    if (configService.get('DB_SYNCHRONIZE') === 'true') {
        console.warn('⚠️  DB_SYNCHRONIZE=true en producción: riesgo de pérdida de datos. ' +
            'Úsalo solo para el primer arranque y luego ponlo en false.');
    }
}
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableShutdownHooks();
    const configService = app.get(config_1.ConfigService);
    const preferredPort = Number(configService.get('PORT', '8001'));
    const host = configService.get('HOST', '0.0.0.0');
    const isDev = configService.get('NODE_ENV') !== 'production';
    if (!isDev) {
        checkProductionConfig(configService);
    }
    app.enableCors({
        origin: resolveCorsOrigin(configService),
        credentials: true,
    });
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        transformOptions: { enableImplicitConversion: true },
    }));
    if (!Number.isInteger(preferredPort) || preferredPort < 1) {
        throw new Error(`Invalid PORT: ${configService.get('PORT')}`);
    }
    const port = await listenOnPort(app, preferredPort, isDev, host);
    console.log(`API running on http://localhost:${port}`);
    if (isDev && host === '0.0.0.0') {
        console.log(`Red local (celular): http://<IP-de-tu-Mac>:${port}`);
    }
}
bootstrap();
//# sourceMappingURL=main.js.map