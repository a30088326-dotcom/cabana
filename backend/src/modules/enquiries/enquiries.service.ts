import {
  BadRequestException,
  Injectable,
  NotFoundException,
  HttpException,
} from "@nestjs/common";
import { randomUUID } from "node:crypto";
import { DatabaseService } from "../../database/database.service";
import { CabanasService } from "../cabanas/cabanas.service";
import type { Enquiry, EnquiryInput } from "@elara/contracts";
@Injectable()
export class EnquiriesService {
  private limits = new Map<string, { count: number; until: number }>();
  constructor(
    private readonly db: DatabaseService,
    private readonly cabanas: CabanasService,
  ) {}
  async create(input: EnquiryInput, ip: string) {
    const now = Date.now();
    for (const [k, v] of this.limits) if (v.until < now) this.limits.delete(k);
    const limit = this.limits.get(ip);
    if (limit && limit.until > now && limit.count >= 10)
      throw new HttpException("Please try again in one hour.", 429);
    const cabana = await this.cabanas.find(input.cabanaId);
    if (input.guests > cabana.capacity)
      throw new BadRequestException(
        "This cabana accommodates up to " + cabana.capacity + " guests",
      );
    this.limits.set(ip, {
      count: (limit?.count || 0) + 1,
      until: limit?.until || now + 3600000,
    });
    const id = "EL-" + randomUUID().slice(0, 8).toUpperCase(),
      createdAt = new Date().toISOString();
    const { website, ...safe } = input;
    await this.db.run(
      "INSERT INTO enquiries(id,created_at,status,payload) VALUES($1,$2,$3,$4)",
      [id, createdAt, "new", JSON.stringify(safe)],
    );
    return {
      id,
      message:
        "Your enquiry has been received. Our team will confirm availability before your stay is reserved.",
    };
  }
  async list(): Promise<Enquiry[]> {
    return (
      await this.db.all<{
        id: string;
        created_at: string;
        status: string;
        payload: string;
      }>("SELECT * FROM enquiries ORDER BY created_at DESC LIMIT 500")
    ).map((r) => ({
      ...JSON.parse(r.payload),
      id: r.id,
      createdAt: r.created_at,
      status: r.status,
    }));
  }
  async update(id: string, status: string) {
    const [row] = await this.db.all("SELECT id FROM enquiries WHERE id=$1", [
      id,
    ]);
    if (!row) throw new NotFoundException();
    await this.db.run("UPDATE enquiries SET status=$1 WHERE id=$2", [
      status,
      id,
    ]);
    return { ok: true };
  }
}
