import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from "@nestjs/common";
import { Request } from "express";
import { enquirySchema } from "@elara/contracts";
import { EnquiriesService } from "./enquiries.service";
import { validate } from "../../common/validation";
import { AuthGuard } from "../auth/auth.guard";
@Controller()
export class EnquiriesController {
  constructor(private readonly service: EnquiriesService) {}
  @Post("enquiries") create(@Body() body: unknown, @Req() req: Request) {
    return this.service.create(
      validate(enquirySchema, body),
      req.ip || "local",
    );
  }
  @Get("admin/enquiries") @UseGuards(AuthGuard) list() {
    return this.service.list();
  }
  @Patch("admin/enquiries/:id") @UseGuards(AuthGuard) update(
    @Param("id") id: string,
    @Body() body: { status: string },
  ) {
    if (!["new", "contacted", "closed"].includes(body.status))
      throw new BadRequestException("Invalid status");
    return this.service.update(id, body.status);
  }
}
