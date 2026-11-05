import { spawn } from "node:child_process";
import { resolve } from "node:path";
import { existsSync } from "node:fs";
const root = resolve(import.meta.dirname, ".."),
  production = process.argv.includes("--production");
if (!existsSync(resolve(root, "backend/.env"))) {
  console.error("Run npm run setup first.");
  process.exit(1);
}
const api = production
  ? spawn(process.execPath, ["--env-file=.env", "dist/main.js"], {
      cwd: resolve(root, "backend"),
      stdio: "inherit",
    })
  : spawn(process.execPath, [resolve(root, "scripts/backend-dev.mjs")], {
      cwd: root,
      stdio: ["inherit", "inherit", "inherit", "ipc"],
    });
const web = spawn(
  process.execPath,
  [
    resolve(root, "node_modules/next/dist/bin/next"),
    production ? "start" : "dev",
    "--hostname",
    "127.0.0.1",
  ],
  { cwd: resolve(root, "frontend"), stdio: "inherit" },
);
let closing = false;
function close() {
  if (closing) return;
  closing = true;
  if (api.connected) api.send("shutdown");
  else api.kill();
  web.kill();
}
process.on("SIGINT", close);
process.on("SIGTERM", close);
for (const child of [api, web])
  child.on("exit", (code) => {
    if (!closing) {
      close();
      process.exitCode = code || 0;
    }
  });
