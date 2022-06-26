import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { User } from 'src/auth/user.entity';
import { Food } from 'src/food/food.entity';
import { HealthyDay } from 'src/healthy-day/healthy-day.entity';
import { MealController } from './meal.controller';
import { Meal } from './meal.entity';
import { MealService } from './meal.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Meal, Food, User, HealthyDay]),
    AuthModule,
  ],
  controllers: [MealController],
  providers: [MealService],
})
export class MealModule {}
