import { Meal } from 'src/meal/meal.entity';
import { Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

export class HealthyDay {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  gym: boolean;

  @Column()
  smoking: boolean;

  @ManyToOne(() => Meal, (meal) => meal.day)
  meal: Meal;
}
