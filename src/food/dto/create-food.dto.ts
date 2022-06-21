import { IsNumber, IsString } from 'class-validator';

export class CreateFoodDto {
  @IsString()
  name: string;

  @IsNumber()
  calories: number;
}
