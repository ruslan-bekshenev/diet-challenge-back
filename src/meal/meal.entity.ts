import { Type } from 'class-transformer';
import { User } from 'src/auth/user.entity';
import { Food } from 'src/food/food.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Meal {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Type(() => Date)
  @Column({ type: 'timestamptz' })
  date: Date;

  @Column({ nullable: false, default: 100 })
  weight: number;

  @ManyToOne(() => Food, (food) => food.meal)
  food: Food;

  @ManyToOne(() => User, (user) => user.meal)
  user: User;
}
