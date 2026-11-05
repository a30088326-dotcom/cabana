import { Injectable, NotFoundException } from "@nestjs/common";
import { DatabaseService } from "../../database/database.service";
import type { Cabana } from "@elara/contracts";
@Injectable()
export class CabanasService {
  constructor(private readonly db: DatabaseService) {}
  async list(includeInactive = false): Promise<Cabana[]> {
    const rows = await this.db.all<{ payload: string }>(
      "SELECT payload FROM cabanas ORDER BY id",
    );
    return rows
      .map((r) => JSON.parse(r.payload) as Cabana)
      .filter((c) => includeInactive || c.active);
  }
  async find(id: string) {
    const all = await this.list();
    const cabana = all.find((c) => c.id === id);
    if (!cabana) throw new NotFoundException("Cabana not found");
    return cabana;
  }
  async save(cabana: Cabana) {
    await this.db.run(
      "INSERT INTO cabanas(id,payload) VALUES($1,$2) ON CONFLICT(id) DO UPDATE SET payload=excluded.payload",
      [cabana.id, JSON.stringify(cabana)],
    );
    return cabana;
  }
}
