import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateMealDto } from './dto/create-meal.dto';
import { MealService } from './meal.service';

@Controller('meal')
export class MealController {
  constructor(private mealService: MealService) {}

  @Post()
  create(@Body() createMealDto: CreateMealDto) {
    return this.mealService.create(createMealDto);
  }

  @Get()
  getList() {
    return this.mealService.getList();
  }
}
