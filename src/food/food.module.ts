import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { FoodController } from './food.controller';
import { Food } from './food.entity';
import { FoodService } from './food.service';

@Module({
  imports: [TypeOrmModule.forFeature([Food]), AuthModule],
  controllers: [FoodController],
  providers: [FoodService],
})
export class FoodModule {}
