import { Controller, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { MealService } from './meal.service';

@Controller('meal')
@UseGuards(AuthGuard())
export class MealController {
  constructor(private mealService: MealService) {}
}
