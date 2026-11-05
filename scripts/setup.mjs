import { existsSync, writeFileSync, readFileSync } from "node:fs";
import { randomBytes, scryptSync } from "node:crypto";
import { resolve } from "node:path";
const root = resolve(import.meta.dirname, ".."),
  env = resolve(root, "backend/.env");
if (!existsSync(env)) {
  const password = randomBytes(15).toString("base64url"),
    salt = randomBytes(16).toString("hex"),
    hash = scryptSync(password, salt, 64).toString("hex");
  writeFileSync(
    env,
    readFileSync(resolve(root, "backend/.env.example"), "utf8").replace(
      "ADMIN_PASSWORD_HASH=",
      "ADMIN_PASSWORD_HASH=" + salt + ":" + hash,
    ),
  );
  writeFileSync(
    resolve(root, ".admin-credentials"),
    "Username: admin\nPassword: " + password + "\n",
    { mode: 0o600 },
  );
  console.log(
    "Local environment ready. Your admin login is in D:\\projects\\cabana\\.admin-credentials",
  );
} else console.log("Existing environment preserved.");
