import { spawn } from "node:child_process";
import { resolve } from "node:path";
import readline from "node:readline";
const root = resolve(import.meta.dirname, ".."),
  backend = resolve(root, "backend");
let server,
  closing = false,
  restarting = Promise.resolve();
const compiler = spawn(
  process.execPath,
  [
    resolve(root, "node_modules/typescript/bin/tsc"),
    "-p",
    resolve(backend, "tsconfig.json"),
    "--watch",
    "--preserveWatchOutput",
    "--pretty",
    "false",
    "--locale",
    "en",
  ],
  { cwd: backend, stdio: ["inherit", "pipe", "inherit"] },
);
async function stopServer() {
  if (server && server.exitCode === null) {
    const old = server;
    await new Promise((done) => {
      old.once("exit", done);
      old.kill();
    });
  }
}
function restart() {
  restarting = restarting.then(async () => {
    if (closing) return;
    await stopServer();
    if (!closing)
      server = spawn(process.execPath, ["--env-file=.env", "dist/main.js"], {
        cwd: backend,
        stdio: "inherit",
      });
  });
}
readline.createInterface({ input: compiler.stdout }).on("line", (line) => {
  console.log(line);
  if (line.includes("Found 0 errors. Watching for file changes.")) restart();
});
async function close() {
  if (closing) return;
  closing = true;
  compiler.kill();
  await stopServer();
  if (process.connected) process.disconnect();
}
process.on("SIGINT", close);
process.on("SIGTERM", close);
process.on("message", (message) => {
  if (message === "shutdown") close();
});
compiler.on("exit", (code) => {
  if (!closing) {
    close();
    process.exitCode = code || 0;
  }
});
