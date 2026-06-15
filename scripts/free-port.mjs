import { execSync } from 'child_process';

/**
 * Libera un puerto TCP matando procesos que lo escuchan (macOS / Linux).
 */
export function freePort(port) {
  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    throw new Error(`Invalid port: ${port}`);
  }

  let pids = [];
  try {
    const output = execSync(`lsof -ti tcp:${port}`, {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    }).trim();
    if (output) pids = output.split('\n').filter(Boolean);
  } catch {
    return false;
  }

  if (pids.length === 0) return false;

  for (const pid of pids) {
    try {
      process.kill(Number(pid), 'SIGTERM');
    } catch {
      // proceso ya terminó
    }
  }

  // Breve espera para que el SO libere el socket
  execSync('sleep 0.3');

  try {
    const survivors = execSync(`lsof -ti tcp:${port}`, {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    }).trim();
    for (const pid of survivors.split('\n').filter(Boolean)) {
      try {
        process.kill(Number(pid), 'SIGKILL');
      } catch {
        // ignore
      }
    }
  } catch {
    // puerto libre
  }

  return true;
}
