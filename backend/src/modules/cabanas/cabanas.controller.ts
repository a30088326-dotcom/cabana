import {
  Body,
  Controller,
  Get,
  Param,
  Put,
  UseGuards,
  BadRequestException,
} from "@nestjs/common";
import { cabanaSchema } from "@elara/contracts";
import { CabanasService } from "./cabanas.service";
import { AuthGuard } from "../auth/auth.guard";
import { validate } from "../../common/validation";
@Controller()
export class CabanasController {
  constructor(private readonly service: CabanasService) {}
  @Get("cabanas") list() {
    return this.service.list();
  }
  @Get("cabanas/:id") find(@Param("id") id: string) {
    return this.service.find(id);
  }
  @Get("admin/cabanas") @UseGuards(AuthGuard) adminList() {
    return this.service.list(true);
  }
  @Put("admin/cabanas/:id") @UseGuards(AuthGuard) save(
    @Param("id") id: string,
    @Body() body: unknown,
  ) {
    const data = validate(cabanaSchema, body);
    if (data.id !== id) throw new BadRequestException("Cabana ID must match");
    return this.service.save(data);
  }
}
