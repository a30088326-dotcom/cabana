import { Controller, Get, Module } from "@nestjs/common";
import { DatabaseModule } from "./database/database.module";
import { AuthModule } from "./modules/auth/auth.module";
import { CabanasModule } from "./modules/cabanas/cabanas.module";
import { ContentModule } from "./modules/content/content.module";
import { EnquiriesModule } from "./modules/enquiries/enquiries.module";
import { MediaModule } from "./modules/media/media.module";
@Controller("health")
class HealthController {
  @Get() get() {
    return { ok: true, service: "elara-api" };
  }
}
@Module({
  imports: [
    DatabaseModule,
    AuthModule,
    CabanasModule,
    ContentModule,
    EnquiriesModule,
    MediaModule,
  ],
  controllers: [HealthController],
})
export class AppModule {}
