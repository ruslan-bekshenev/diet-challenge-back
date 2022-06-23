import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { format } from 'date-fns';
import { User } from 'src/auth/user.entity';
import { Food } from 'src/food/food.entity';
import { groupBy } from 'src/utils/groupBy';
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

  async create(createMealDto: CreateMealDto, user: User) {
    const { date, weight } = createMealDto;
    const findFood = await this.foodRepository.findOneBy({
      id: createMealDto.food,
    });

    const meal = this.mealRepository.create({
      date,
      weight,
      user,
      food: findFood,
    });

    await this.mealRepository.save(meal);

    return meal;
  }

  async getList(user: User) {
    const meals = await this.mealRepository.find({
      relations: ['food'],
      where: {
        user,
      },
      order: {
        date: 'ASC',
      },
    });
    const formattedMeals = meals
      .sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        if (dateA > dateB) {
          return 1;
        } else if (dateA < dateB) {
          return -1;
        }

        return 0;
      })
      .map((meal) => {
        return {
          ...meal,
          date: format(new Date(meal.date), 'yyyy-MM-dd'),
          time: format(new Date(meal.date), 'HH:mm:ss.SSSxxx'),
        };
      });
    const grouped = groupBy(formattedMeals, 'date');
    return grouped;
  }
}
