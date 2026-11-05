import {
  BadRequestException,
  Body,
  Controller,
  Post,
  UseGuards,
} from "@nestjs/common";
import { randomUUID } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import { resolve, join } from "node:path";
import { AuthGuard } from "../auth/auth.guard";
@Controller("admin/media")
@UseGuards(AuthGuard)
export class MediaController {
  @Post() async upload(@Body() body: { data?: string }) {
    if (typeof body.data !== "string" || body.data.length > 5600000)
      throw new BadRequestException("Choose a JPG, PNG or WebP under 4 MB");
    const match = body.data.match(
      /^data:image\/(jpeg|png|webp);base64,([a-zA-Z0-9+/=]+)$/,
    );
    if (!match) throw new BadRequestException("Unsupported image");
    const buffer = Buffer.from(match[2], "base64");
    if (buffer.length > 4 * 1024 * 1024)
      throw new BadRequestException("Image is too large");
    const kind = match[1];
    const valid =
      kind === "jpeg"
        ? buffer[0] === 255 && buffer[1] === 216
        : kind === "png"
          ? buffer
              .subarray(0, 8)
              .equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]))
          : buffer.toString("ascii", 0, 4) === "RIFF" &&
            buffer.toString("ascii", 8, 12) === "WEBP";
    if (!valid) throw new BadRequestException("Invalid image file");
    const name = randomUUID() + "." + (kind === "jpeg" ? "jpg" : kind),
      directory = resolve(process.env.UPLOAD_DIR || "./uploads");
    await mkdir(directory, { recursive: true });
    await writeFile(join(directory, name), buffer, { flag: "wx" });
    return { src: "/uploads/" + name };
  }
}
