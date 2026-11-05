import { Module } from "@nestjs/common";
import { CabanasService } from "./cabanas.service";
import { CabanasController } from "./cabanas.controller";
@Module({
  providers: [CabanasService],
  controllers: [CabanasController],
  exports: [CabanasService],
})
export class CabanasModule {}
