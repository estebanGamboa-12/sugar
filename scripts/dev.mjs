import { spawn } from "node:child_process";
import { existsSync, rmSync } from "node:fs";
import path from "node:path";

const lockPath = path.join(process.cwd(), ".next", "dev", "lock");

if (existsSync(lockPath)) {
  rmSync(lockPath, { force: true });
  console.log("[dev] Removed stale .next/dev/lock before starting Next.js.");
}

const instanceId = `${process.pid}-${Date.now()}`;
const args = ["next", "dev", ...process.argv.slice(2)];

const child = spawn("npx", args, {
  stdio: "inherit",
  shell: process.platform === "win32",
  env: {
    ...process.env,
    NEXT_DEV_INSTANCE_ID: instanceId,
  },
});

child.on("exit", (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal);
    return;
  }

  process.exit(code ?? 1);
});
