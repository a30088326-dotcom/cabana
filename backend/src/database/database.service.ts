import { Injectable, OnModuleInit, OnModuleDestroy } from "@nestjs/common";
import { DatabaseSync } from "node:sqlite";
import { mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { Pool } from "pg";
import { seedCabanas, seedSettings } from "@elara/contracts";
@Injectable()
export class DatabaseService implements OnModuleInit, OnModuleDestroy {
  private sqlite?: DatabaseSync;
  private postgres?: Pool;
  async onModuleInit() {
    if (process.env.DATABASE_URL)
      this.postgres = new Pool({ connectionString: process.env.DATABASE_URL });
    else {
      const file = resolve(process.env.DATABASE_PATH || "./data/elara.sqlite");
      mkdirSync(dirname(file), { recursive: true });
      this.sqlite = new DatabaseSync(file);
      this.sqlite.exec("PRAGMA journal_mode=WAL; PRAGMA busy_timeout=5000;");
    }
    // Versioned, additive initial migration; portable SQL is shared by both adapters.
    await this.run(
      "CREATE TABLE IF NOT EXISTS schema_migrations (version INTEGER PRIMARY KEY, applied_at TEXT NOT NULL)",
    );
    await this.run(
      "CREATE TABLE IF NOT EXISTS settings (id TEXT PRIMARY KEY, payload TEXT NOT NULL)",
    );
    await this.run(
      "CREATE TABLE IF NOT EXISTS cabanas (id TEXT PRIMARY KEY, payload TEXT NOT NULL)",
    );
    await this.run(
      "CREATE TABLE IF NOT EXISTS enquiries (id TEXT PRIMARY KEY, created_at TEXT NOT NULL, status TEXT NOT NULL, payload TEXT NOT NULL)",
    );
    await this.run(
      "CREATE INDEX IF NOT EXISTS enquiries_created ON enquiries(created_at)",
    );
    await this.run(
      "INSERT INTO schema_migrations(version,applied_at) VALUES($1,$2) ON CONFLICT(version) DO NOTHING",
      [1, new Date().toISOString()],
    );
    await this.run(
      "INSERT INTO settings(id,payload) VALUES($1,$2) ON CONFLICT(id) DO NOTHING",
      ["site", JSON.stringify(seedSettings)],
    );
    for (const cabana of seedCabanas)
      await this.run(
        "INSERT INTO cabanas(id,payload) VALUES($1,$2) ON CONFLICT(id) DO NOTHING",
        [cabana.id, JSON.stringify(cabana)],
      );
  }
  async all<T = Record<string, unknown>>(
    sql: string,
    params: (string | number)[] = [],
  ): Promise<T[]> {
    if (this.postgres)
      return (await this.postgres.query(sql, params)).rows as T[];
    return this.sqlite!.prepare(sql.replace(/\$\d+/g, "?")).all(
      ...params,
    ) as T[];
  }
  async run(sql: string, params: (string | number)[] = []) {
    if (this.postgres) {
      await this.postgres.query(sql, params);
      return;
    }
    this.sqlite!.prepare(sql.replace(/\$\d+/g, "?")).run(...params);
  }
  async onModuleDestroy() {
    this.sqlite?.close();
    await this.postgres?.end();
  }
}
