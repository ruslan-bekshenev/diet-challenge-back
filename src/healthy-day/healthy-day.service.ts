import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';
import { Food } from 'src/food/food.entity';
import { Meal } from 'src/meal/meal.entity';
import { Repository } from 'typeorm';
import { CreateHealthyDayDto } from './dto/create-healthy-day.dto';
import { formatHealthyDay } from './format.healthy-day';
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
    const result = [];
    for await (const meal of meals) {
      const { date, food, weight } = meal;
      const mealObject = this.mealRepository.create({
        date,
        weight,
        food,
      });
      await this.mealRepository.save(mealObject);

      const newHealthyDay = this.healthyDayRepository.create({
        gym,
        smoking,
        date: dateHealthy,
        meal: mealObject,
        user,
      });

      await this.healthyDayRepository.save(newHealthyDay);

      result.push(newHealthyDay);
    }

    return formatHealthyDay(result, 'date');
  }

  async getList(user: User) {
    const list = await this.healthyDayRepository.find({
      relations: ['meal'],
      where: {
        user,
      },
      order: {
        date: 'ASC',
      },
    });

    return formatHealthyDay(list, 'date');
  }
}
