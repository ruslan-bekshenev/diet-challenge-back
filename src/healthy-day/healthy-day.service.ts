import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';
import { Food } from 'src/food/food.entity';
import { Meal } from 'src/meal/meal.entity';
import { Repository } from 'typeorm';
import { CreateHealthyDayDto } from './dto/create-healthy-day.dto';
import { formatHealthyDay, transformHealthyDay } from './format.healthy-day';
import { HealthyDay } from './healthy-day.entity';

@Injectable()
export class HealthyDayService {
  constructor(
    @InjectRepository(HealthyDay)
    private healthyDayRepository: Repository<HealthyDay>,
    @InjectRepository(Meal)
    private mealRepository: Repository<Meal>,
    @InjectRepository(Food)
    private foodRepository: Repository<Food>,
  ) {}

  async create(createHealthyDayDto: CreateHealthyDayDto, user: User) {
    const { meals, gym, smoking, date: dateHealthy } = createHealthyDayDto;
    const mealsArray = [];
    const days = [];
    const DEFAULT_WEIGHT = 100;
    for await (const meal of meals) {
      const { date, food, weight } = meal;
      const calories = (+weight / DEFAULT_WEIGHT) * +food.calories;

      const mealObject = this.mealRepository.create({
        date,
        weight,
        food,
        calories,
      });

      await this.mealRepository.save(mealObject);

      mealsArray.push(mealObject);

      const newHealthyDay = this.healthyDayRepository.create({
        gym,
        smoking,
        date: dateHealthy,
        meal: mealObject,
        user,
      });

      await this.healthyDayRepository.save(newHealthyDay);

      days.push(newHealthyDay);
    }

    return days;
  }

  async getList(user: User) {
    const list = await this.healthyDayRepository
      .createQueryBuilder('healthy_day')
      .select('healthy_day.date')
      .distinctOn(['healthy_day.date'])
      .getMany();

    return list;
  }

  async getByDate(date: Date, user: User) {
    const currentDate = await this.healthyDayRepository.find({
      relations: ['meal'],
      where: { date, user },
    });

    return transformHealthyDay(currentDate);
  }
}
