import test from "node:test";
import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { once } from "node:events";
import { mkdtemp, mkdir, rm, readFile } from "node:fs/promises";
import { resolve, join } from "node:path";
import { createServer } from "node:net";
import { scryptSync } from "node:crypto";
const root = resolve(import.meta.dirname, "..");
test(
  "API: authentication, validation, persistent enquiries, content editing and media",
  { timeout: 45000 },
  async (t) => {
    const sandbox = resolve(root, "work");
    await mkdir(sandbox, { recursive: true });
    const dir = await mkdtemp(join(sandbox, "api-test-"));
    const probe = createServer();
    await new Promise((r) => probe.listen(0, "127.0.0.1", r));
    const port = probe.address().port;
    await new Promise((r) => probe.close(r));
    const password = "integration-test-password",
      salt = "integration-test-salt",
      hash = salt + ":" + scryptSync(password, salt, 64).toString("hex");
    const env = {
      ...process.env,
      API_PORT: String(port),
      HOST: "127.0.0.1",
      ADMIN_USER: "admin",
      ADMIN_PASSWORD_HASH: hash,
      DATABASE_URL: "",
      DATABASE_PATH: join(dir, "test.sqlite"),
      UPLOAD_DIR: join(dir, "uploads"),
      COOKIE_SECURE: "false",
    };
    let proc;
    let log = "";
    function launch() {
      proc = spawn(process.execPath, [resolve(root, "backend/dist/main.js")], {
        cwd: root,
        env,
        stdio: ["ignore", "pipe", "pipe"],
      });
      proc.stdout.on("data", (d) => (log += d));
      proc.stderr.on("data", (d) => (log += d));
    }
    async function ready() {
      for (let i = 0; i < 80; i++) {
        try {
          if ((await fetch(base + "/health")).ok) return;
        } catch {}
        if (proc.exitCode !== null) throw new Error(log);
        await new Promise((r) => setTimeout(r, 100));
      }
      throw new Error("API readiness timeout: " + log);
    }
    async function stop() {
      if (proc && proc.exitCode === null) {
        const ended = once(proc, "exit");
        proc.kill();
        await ended;
      }
    }
    const base = "http://127.0.0.1:" + port + "/api/v1";
    let cookie = "";
    async function request(
      path,
      { method = "GET", body, auth = false, csrf = true } = {},
    ) {
      const r = await fetch(base + path, {
        method,
        headers: {
          "Content-Type": "application/json",
          ...(csrf ? { "X-Requested-With": "elara-web" } : {}),
          ...(auth ? { Cookie: cookie } : {}),
        },
        ...(body !== undefined ? { body: JSON.stringify(body) } : {}),
      });
      const data = await r.json();
      return { r, data };
    }
    try {
      launch();
      await ready();
      await t.test("protected routes reject anonymous access", async () =>
        assert.equal((await request("/admin/enquiries")).r.status, 401),
      );
      await t.test("incorrect admin password is rejected", async () =>
        assert.equal(
          (
            await request("/auth/login", {
              method: "POST",
              body: { username: "admin", password: "wrong" },
            })
          ).r.status,
          401,
        ),
      );
      await t.test("admin login uses an HTTP-only session cookie", async () => {
        const { r } = await request("/auth/login", {
          method: "POST",
          body: { username: "admin", password },
        });
        assert.equal(r.status, 201);
        const header = r.headers.get("set-cookie");
        assert.match(header, /HttpOnly/i);
        assert.match(header, /SameSite=Strict/i);
        cookie = header.split(";")[0];
      });
      const start = new Date(Date.now() + 5 * 86400000)
          .toISOString()
          .slice(0, 10),
        end = new Date(Date.now() + 7 * 86400000).toISOString().slice(0, 10);
      const input = {
        name: "Integration Test Guest",
        email: "guest@example.com",
        phone: "+94770000000",
        cabanaId: "forest-cabana",
        checkIn: start,
        checkOut: end,
        guests: 2,
        message: "Local automated test",
        consent: true,
      };
      await t.test(
        "server rejects invalid dates and excess capacity",
        async () => {
          assert.equal(
            (
              await request("/enquiries", {
                method: "POST",
                body: { ...input, checkOut: start },
              })
            ).r.status,
            400,
          );
          assert.equal(
            (
              await request("/enquiries", {
                method: "POST",
                body: { ...input, guests: 3 },
              })
            ).r.status,
            400,
          );
        },
      );
      let reference;
      await t.test("valid enquiry is saved and visible to admin", async () => {
        const { r, data } = await request("/enquiries", {
          method: "POST",
          body: input,
        });
        assert.equal(r.status, 201);
        assert.match(data.id, /^EL-/);
        reference = data.id;
        const list = (await request("/admin/enquiries", { auth: true })).data;
        assert.equal(list.length, 1);
        assert.equal(list[0].id, reference);
      });
      await t.test("admin mutations require request verification", async () =>
        assert.equal(
          (
            await request("/admin/enquiries/" + reference, {
              method: "PATCH",
              auth: true,
              csrf: false,
              body: { status: "contacted" },
            })
          ).r.status,
          403,
        ),
      );
      await t.test("enquiry status updates persist", async () => {
        assert.equal(
          (
            await request("/admin/enquiries/" + reference, {
              method: "PATCH",
              auth: true,
              body: { status: "contacted" },
            })
          ).r.status,
          200,
        );
        assert.equal(
          (await request("/admin/enquiries", { auth: true })).data[0].status,
          "contacted",
        );
      });
      await t.test(
        "content and cabana edits reach the public API",
        async () => {
          const site = (await request("/site")).data;
          await request("/admin/site", {
            method: "PUT",
            auth: true,
            body: { ...site, headline: "A test of content persistence." },
          });
          assert.equal(
            (await request("/site")).data.headline,
            "A test of content persistence.",
          );
          const c = (await request("/cabanas/forest-cabana")).data;
          assert.equal(
            (
              await request("/admin/cabanas/" + c.id, {
                method: "PUT",
                auth: true,
                body: { ...c, price: 41000 },
              })
            ).r.status,
            200,
          );
          assert.equal(
            (await request("/cabanas/forest-cabana")).data.price,
            41000,
          );
        },
      );
      await t.test(
        "media validates image signatures and serves uploaded photos",
        async () => {
          assert.equal(
            (
              await request("/admin/media", {
                method: "POST",
                auth: true,
                body: { data: "data:image/png;base64,aGVsbG8=" },
              })
            ).r.status,
            400,
          );
          const bytes = await readFile(
            resolve(root, "frontend/public/images/exterior.webp"),
          );
          const result = await request("/admin/media", {
            method: "POST",
            auth: true,
            body: {
              data: "data:image/webp;base64," + bytes.toString("base64"),
            },
          });
          assert.equal(result.r.status, 201);
          assert.match(result.data.src, /^\/uploads\/.*\.webp$/);
          assert.equal(
            (await fetch("http://127.0.0.1:" + port + result.data.src)).status,
            200,
          );
        },
      );
      await t.test("data survives an API restart", async () => {
        await stop();
        launch();
        await ready();
        assert.equal(
          (await request("/site")).data.headline,
          "A test of content persistence.",
        );
        assert.equal(
          (await request("/cabanas/forest-cabana")).data.price,
          41000,
        );
        const { r } = await request("/auth/login", {
          method: "POST",
          body: { username: "admin", password },
        });
        cookie = r.headers.get("set-cookie").split(";")[0];
        assert.equal(
          (await request("/admin/enquiries", { auth: true })).data[0].id,
          reference,
        );
      });
      await t.test("logout revokes the session", async () => {
        await request("/auth/logout", { method: "POST", auth: true });
        assert.equal((await request("/auth/me", { auth: true })).r.status, 401);
      });
    } finally {
      await stop();
      if (dir.startsWith(sandbox + "\\") || dir.startsWith(sandbox + "/"))
        await rm(dir, { recursive: true, force: true });
    }
  },
);
