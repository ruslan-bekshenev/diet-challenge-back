import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { MealController } from './meal.controller';
import { Meal } from './meal.entity';
import { MealService } from './meal.service';

@Module({
  imports: [TypeOrmModule.forFeature([Meal]), AuthModule],
  controllers: [MealController],
  providers: [MealService],
})
export class MealModule {}
