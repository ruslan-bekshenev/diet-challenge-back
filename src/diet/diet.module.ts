import { Module } from '@nestjs/common';
import { DietController } from './diet.controller';
import { DietService } from './diet.service';

@Module({
  controllers: [DietController],
  providers: [DietService],
})
export class DietModule {}
