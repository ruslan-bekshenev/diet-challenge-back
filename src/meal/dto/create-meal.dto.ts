import { IsDate, IsDateString, IsNumber, IsString } from 'class-validator';

export class CreateMealDto {
  @IsDateString()
  date: Date;

  @IsNumber()
  weight: number;

  @IsString()
  food: string;

  @IsString()
  user: string;
}
