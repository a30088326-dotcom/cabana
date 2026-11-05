import {
  Injectable,
  UnauthorizedException,
  HttpException,
} from "@nestjs/common";
import {
  randomBytes,
  scryptSync,
  timingSafeEqual,
  createHash,
} from "node:crypto";
@Injectable()
export class AuthService {
  private sessions = new Map<string, number>();
  private attempts = new Map<string, { count: number; until: number }>();
  login(username: string, password: string, ip: string) {
    const now = Date.now();
    this.prune(now);
    const attempt = this.attempts.get(ip);
    if (attempt && attempt.until > now && attempt.count >= 8)
      throw new HttpException(
        "Too many attempts. Try again in 15 minutes.",
        429,
      );
    const [salt, key] = (process.env.ADMIN_PASSWORD_HASH || "").split(":");
    const candidate = scryptSync(
      String(password).slice(0, 200),
      salt || "unconfigured",
      64,
    );
    const valid =
      !!key &&
      key.length === 128 &&
      timingSafeEqual(candidate, Buffer.from(key, "hex")) &&
      username === (process.env.ADMIN_USER || "admin");
    if (!valid) {
      this.attempts.set(ip, {
        count: (attempt?.until && attempt.until > now ? attempt.count : 0) + 1,
        until: now + 900000,
      });
      throw new UnauthorizedException("Incorrect username or password");
    }
    this.attempts.delete(ip);
    const token = randomBytes(32).toString("hex");
    this.sessions.set(this.hash(token), now + 8 * 3600000);
    return token;
  }
  verify(token?: string) {
    if (!token) return false;
    const until = this.sessions.get(this.hash(token));
    return !!until && until > Date.now();
  }
  logout(token?: string) {
    if (token) this.sessions.delete(this.hash(token));
  }
  private hash(value: string) {
    return createHash("sha256").update(value).digest("hex");
  }
  private prune(now: number) {
    for (const [k, v] of this.sessions) if (v < now) this.sessions.delete(k);
    for (const [k, v] of this.attempts)
      if (v.until < now) this.attempts.delete(k);
  }
}
