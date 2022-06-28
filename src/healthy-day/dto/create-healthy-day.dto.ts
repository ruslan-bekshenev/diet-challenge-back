import { IsBoolean, IsDateString, IsNumber } from 'class-validator';
import { Meal } from 'src/meal/meal.entity';

export class CreateHealthyDayDto {
  @IsBoolean()
  gym?: boolean;

  @IsBoolean()
  smoking?: boolean;

  meals: Meal[];

  @IsDateString()
  date: Date;
}
