import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';
import { Food } from 'src/food/food.entity';
import { Repository } from 'typeorm';
import { CreateMealDto } from './dto/create-meal.dto';
import { Meal } from './meal.entity';

@Injectable()
export class MealService {
  constructor(
    @InjectRepository(Meal)
    private mealRepository: Repository<Meal>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Food)
    private foodRepository: Repository<Food>,
  ) {}

  async create(createMealDto: CreateMealDto) {
    const { date, weight } = createMealDto;
    const findUser = await this.userRepository.findOneBy({
      id: createMealDto.user,
    });
    const findFood = await this.foodRepository.findOneBy({
      id: createMealDto.food,
    });

    const meal = this.mealRepository.create({
      date,
      weight,
      user: findUser,
      food: findFood,
    });

    await this.mealRepository.save(meal);
  }

  async getList() {
    const meals = await this.mealRepository.find({
      relations: ['user', 'food'],
    });
    return meals;
  }
}
