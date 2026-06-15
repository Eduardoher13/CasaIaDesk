import { spawn } from 'child_process';
import { freePort } from './free-port.mjs';
import { loadEnvFile, resolvePort, root } from './load-env-port.mjs';

loadEnvFile();
const port = resolvePort();

if (freePort(port)) {
  console.log(`Puerto ${port} liberado (proceso anterior terminado).`);
}

const isDebug = process.argv.includes('--debug');
const nestArgs = isDebug
  ? ['nest', 'start', '--debug', '--watch']
  : ['nest', 'start', '--watch'];

const child = spawn(
  process.platform === 'win32' ? 'npx.cmd' : 'npx',
  nestArgs,
  {
    cwd: root,
    stdio: 'inherit',
    env: { ...process.env, PORT: String(port) },
  },
);

const forwardSignal = (signal) => {
  if (!child.killed) child.kill(signal);
};

process.on('SIGINT', () => forwardSignal('SIGINT'));
process.on('SIGTERM', () => forwardSignal('SIGTERM'));

child.on('exit', (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal);
    return;
  }
  process.exit(code ?? 0);
});
