import { randomBytes, scryptSync } from "node:crypto";
import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
const root = resolve(import.meta.dirname, ".."),
  file = resolve(root, "backend/.env");
const password = randomBytes(15).toString("base64url"),
  salt = randomBytes(16).toString("hex");
writeFileSync(
  file,
  readFileSync(file, "utf8").replace(
    /^ADMIN_PASSWORD_HASH=.*$/m,
    "ADMIN_PASSWORD_HASH=" +
      salt +
      ":" +
      scryptSync(password, salt, 64).toString("hex"),
  ),
);
writeFileSync(
  resolve(root, ".admin-credentials"),
  "Username: admin\nPassword: " + password + "\n",
  { mode: 0o600 },
);
console.log(
  "New credentials saved in .admin-credentials. Restart the API to apply.",
);
