import { spawn } from "node:child_process";
import { existsSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const website = "http://127.0.0.1:3000";
const backend = "http://127.0.0.1:4000/api/v1/health";
const noOpen = process.argv.includes("--no-open");
const children = [];
let closing = false;

async function probe(url, api = false) {
  try {
    const response = await fetch(url, { signal: AbortSignal.timeout(1800) });
    if (api) {
      const data = await response.json().catch(() => null);
      return {
        ready: response.ok && data?.service === "elara-api",
        busy: true,
      };
    }
    const html = await response.text();
    return {
      ready:
        response.ok && html.includes("stay-search") && html.includes("hero"),
      busy: true,
    };
  } catch (error) {
    const code = error.cause?.code;
    return {
      ready: false,
      busy: code !== "ECONNREFUSED" && code !== "ECONNRESET",
    };
  }
}

function launch(script, cwd = root, args = []) {
  const child = spawn(process.execPath, [script, ...args], {
    cwd,
    stdio: "inherit",
  });
  children.push(child);
  child.on("error", (error) => {
    console.error("Could not start the application: " + error.message);
    close(1);
  });
  child.on("exit", (code) => {
    if (!closing) close(code || 0);
  });
  return child;
}

function close(code = 0) {
  if (closing) return;
  closing = true;
  for (const child of children) if (child.exitCode === null) child.kill();
  process.exitCode = code;
}

function showReady() {
  console.log("\n================================================");
  console.log("  CABANA WEBSITE IS READY");
  console.log("  Website : " + website);
  console.log("  Admin   : " + website + "/admin");
  console.log("================================================\n");
  if (children.length)
    console.log("Keep this terminal open. Press Ctrl+C to stop.\n");
  else
    console.log(
      "Already running. Your existing server terminal stays in control.\n",
    );
  if (!noOpen) {
    const command =
      process.platform === "win32"
        ? "explorer.exe"
        : process.platform === "darwin"
          ? "open"
          : "xdg-open";
    const browser = spawn(command, [website], {
      stdio: "ignore",
      windowsHide: true,
    });
    browser.on("error", () =>
      console.log("Open the Website link above in your browser."),
    );
  }
}

async function main() {
  if (Number(process.versions.node.split(".")[0]) < 24)
    throw new Error("Node.js 24 or newer is required.");
  if (!existsSync(resolve(root, "node_modules/next/dist/bin/next")))
    throw new Error(
      "Dependencies are missing. Run npm install in D:\\projects\\cabana once.",
    );
  if (!existsSync(resolve(root, "backend/.env"))) {
    const setup = spawn(
      process.execPath,
      [resolve(root, "scripts/setup.mjs")],
      { cwd: root, stdio: "inherit" },
    );
    const code = await new Promise((done, reject) => {
      setup.once("error", reject);
      setup.once("exit", done);
    });
    if (code !== 0) throw new Error("Local setup could not complete.");
  }
  const [webState, apiState] = await Promise.all([
    probe(website),
    probe(backend, true),
  ]);
  if (webState.ready && apiState.ready) {
    showReady();
    return;
  }
  if (
    (webState.busy && !webState.ready) ||
    (apiState.busy && !apiState.ready)
  ) {
    throw new Error(
      "Port 3000 or 4000 is occupied or still starting. If you just started the website, wait a moment and run this command again.",
    );
  }
  console.log(
    "\nStarting the cabana website. Waiting for frontend and backend...\n",
  );
  if (!webState.ready && !apiState.ready)
    launch(resolve(root, "scripts/dev.mjs"));
  else if (!apiState.ready) launch(resolve(root, "scripts/backend-dev.mjs"));
  else
    launch(
      resolve(root, "node_modules/next/dist/bin/next"),
      resolve(root, "frontend"),
      ["dev", "--hostname", "127.0.0.1"],
    );
  const deadline = Date.now() + 90000;
  while (!closing && Date.now() < deadline) {
    const [web, api] = await Promise.all([
      probe(website),
      probe(backend, true),
    ]);
    if (web.ready && api.ready) {
      showReady();
      return;
    }
    await new Promise((done) => setTimeout(done, 500));
  }
  if (!closing)
    throw new Error(
      "Startup did not complete. Check the compiler/server error shown above.",
    );
}

process.on("SIGINT", () => close());
process.on("SIGTERM", () => close());
main().catch((error) => {
  console.error("\n" + error.message);
  close(1);
});
