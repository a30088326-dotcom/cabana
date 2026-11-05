import { Injectable } from "@nestjs/common";
import { DatabaseService } from "../../database/database.service";
import type { SiteSettings } from "@elara/contracts";
@Injectable()
export class ContentService {
  constructor(private readonly db: DatabaseService) {}
  async get(): Promise<SiteSettings> {
    const [row] = await this.db.all<{ payload: string }>(
      "SELECT payload FROM settings WHERE id=$1",
      ["site"],
    );
    return JSON.parse(row.payload);
  }
  async save(data: SiteSettings) {
    await this.db.run("UPDATE settings SET payload=$1 WHERE id=$2", [
      JSON.stringify(data),
      "site",
    ]);
    return data;
  }
}
