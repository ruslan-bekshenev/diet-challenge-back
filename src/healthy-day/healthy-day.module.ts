import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { Meal } from 'src/meal/meal.entity';
import { HealthyDay } from './healthy-day.entity';
import { HealthyDayService } from './healthy-day.service';

@Module({
  imports: [TypeOrmModule.forFeature([HealthyDay, Meal]), AuthModule],
  providers: [HealthyDayService],
})
export class HealthyDayModule {}
