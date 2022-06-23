import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { CreateMealDto } from './dto/create-meal.dto';
import { MealService } from './meal.service';

@Controller('meal')
@UseGuards(AuthGuard())
export class MealController {
  constructor(private mealService: MealService) {}

  @Post()
  create(@Body() createMealDto: CreateMealDto, @GetUser() user: User) {
    return this.mealService.create(createMealDto, user);
  }

  @Get()
  getList(@GetUser() user: User) {
    return this.mealService.getList(user);
  }
}
