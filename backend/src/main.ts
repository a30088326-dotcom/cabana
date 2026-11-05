import "reflect-metadata";
import { NestFactory } from "@nestjs/core";
import { json, static as serveStatic } from "express";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import { mkdirSync } from "node:fs";
import { resolve } from "node:path";
import { AppModule } from "./app.module";
async function main() {
  const app = await NestFactory.create(AppModule, { bodyParser: false });
  app.use(helmet());
  app.use(json({ limit: "6mb" }));
  app.use(cookieParser());
  // Browser requests use the frontend proxy, so no cross-origin credential access is needed.
  app.use((req: any, res: any, next: any) => {
    res.setHeader("Cache-Control", "no-store");
    next();
  });
  const uploads = resolve(process.env.UPLOAD_DIR || "./uploads");
  mkdirSync(uploads, { recursive: true });
  app.use("/uploads", serveStatic(uploads, { dotfiles: "deny", index: false }));
  app.setGlobalPrefix("api/v1");
  app.enableShutdownHooks();
  await app.listen(
    Number(process.env.API_PORT || 4000),
    process.env.HOST || "127.0.0.1",
  );
  console.log(
    "ELARA API ready at http://127.0.0.1:" +
      String(process.env.API_PORT || 4000),
  );
}
main().catch((error) => {
  console.error(error);
  process.exit(1);
});
