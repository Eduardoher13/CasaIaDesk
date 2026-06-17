import { existsSync, readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

export function loadEnvFile() {
  const envPath = join(root, '.env');
  if (!existsSync(envPath)) return;

  for (const line of readFileSync(envPath, 'utf8').split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eq = trimmed.indexOf('=');
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    const value = trimmed.slice(eq + 1).trim();
    // El .env es la fuente de verdad: un valor no vacío siempre gana
    // (evita que una variable previa vacía oculte la del archivo).
    if (value !== '') {
      process.env[key] = value;
    } else if (!(key in process.env)) {
      process.env[key] = value;
    }
  }
}

export function resolvePort(defaultPort = 8001) {
  loadEnvFile();
  const parsed = Number.parseInt(process.env.PORT ?? String(defaultPort), 10);
  return Number.isNaN(parsed) ? defaultPort : parsed;
}

export { root };
