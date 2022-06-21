import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateFoodDto } from './dto/create-food.dto';
import { Food } from './food.entity';

@Injectable()
export class FoodService {
  constructor(
    @InjectRepository(Food)
    private foodRepository: Repository<Food>,
  ) {}

  async create(createFoodDto: CreateFoodDto) {
    const { calories, name } = createFoodDto;
    const food = this.foodRepository.create({ name, calories: +calories });

    await this.foodRepository.save(food);

    return food;
  }

  async getList() {
    return this.foodRepository.find();
  }
}
