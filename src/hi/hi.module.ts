import { Module } from "@nestjs/common";
import { HiController } from "./hi.controller";

@Module({
  controllers: [HiController],
})
export class HiModule {}
