import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateFoodDto } from './dto/create-food.dto';
import { FoodService } from './food.service';

@Controller('food')
@UseGuards(AuthGuard())
export class FoodController {
  constructor(private foodService: FoodService) {}

  @Post()
  create(@Body() createFoodDto: CreateFoodDto) {
    console.log({ createFoodDto });

    return this.foodService.create(createFoodDto);
  }

  @Get()
  getList() {
    return this.foodService.getList();
  }
}
