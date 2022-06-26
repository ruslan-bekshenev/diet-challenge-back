import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { Food } from 'src/food/food.entity';
import { Meal } from 'src/meal/meal.entity';
import { HealthyDayController } from './healthy-day.controller';
import { HealthyDay } from './healthy-day.entity';
import { HealthyDayService } from './healthy-day.service';

@Module({
  imports: [TypeOrmModule.forFeature([Meal, HealthyDay, Food]), AuthModule],
  providers: [HealthyDayService],
  controllers: [HealthyDayController],
})
export class HealthyDayModule {}
