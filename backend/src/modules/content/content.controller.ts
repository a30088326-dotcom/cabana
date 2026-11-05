import { Body, Controller, Get, Put, UseGuards } from "@nestjs/common";
import { settingsSchema } from "@elara/contracts";
import { ContentService } from "./content.service";
import { AuthGuard } from "../auth/auth.guard";
import { validate } from "../../common/validation";
@Controller()
export class ContentController {
  constructor(private readonly service: ContentService) {}
  @Get("site") get() {
    return this.service.get();
  }
  @Put("admin/site") @UseGuards(AuthGuard) save(@Body() body: unknown) {
    return this.service.save(validate(settingsSchema, body));
  }
}
