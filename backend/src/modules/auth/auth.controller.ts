import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
  BadRequestException,
} from "@nestjs/common";
import { Request, Response } from "express";
import { AuthService } from "./auth.service";
import { AuthGuard } from "./auth.guard";
@Controller("auth")
export class AuthController {
  constructor(private readonly auth: AuthService) {}
  @Post("login") login(
    @Body() body: { username?: string; password?: string },
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    if (
      typeof body.username !== "string" ||
      typeof body.password !== "string" ||
      body.password.length > 200
    )
      throw new BadRequestException("Enter your username and password");
    const token = this.auth.login(
      body.username,
      body.password,
      req.ip || "local",
    );
    res.cookie("elara_session", token, {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.COOKIE_SECURE === "true",
      maxAge: 8 * 3600000,
      path: "/",
    });
    return { ok: true };
  }
  @Get("me") @UseGuards(AuthGuard) me() {
    return { username: process.env.ADMIN_USER || "admin" };
  }
  @Post("logout") @UseGuards(AuthGuard) logout(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    this.auth.logout(req.cookies?.elara_session);
    res.clearCookie("elara_session", { path: "/" });
    return { ok: true };
  }
}
