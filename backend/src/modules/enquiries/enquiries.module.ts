import { Module } from "@nestjs/common";
import { CabanasModule } from "../cabanas/cabanas.module";
import { EnquiriesService } from "./enquiries.service";
import { EnquiriesController } from "./enquiries.controller";
@Module({
  imports: [CabanasModule],
  providers: [EnquiriesService],
  controllers: [EnquiriesController],
})
export class EnquiriesModule {}
