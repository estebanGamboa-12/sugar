import { spawn } from 'node:child_process';

const instanceId = `${process.pid}-${Date.now()}`;
const args = ['next', 'dev', ...process.argv.slice(2)];

const child = spawn('npx', args, {
  stdio: 'inherit',
  shell: process.platform === 'win32',
  env: {
    ...process.env,
    NEXT_DEV_INSTANCE_ID: instanceId,
  },
});

child.on('exit', (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal);
    return;
  }

  process.exit(code ?? 1);
});
