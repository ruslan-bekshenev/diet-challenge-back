import { Type } from 'class-transformer';
import { User } from 'src/auth/user.entity';
import { Meal } from 'src/meal/meal.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class HealthyDay {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Type(() => Date)
  @Column({ type: 'date' })
  date: Date;

  @Column()
  gym: boolean;

  @Column()
  smoking: boolean;

  @ManyToOne(() => Meal, (meal) => meal.healthyDay, { cascade: true })
  meal: Meal;

  @ManyToOne(() => User, (user) => user.healthyDay)
  user: User;
}
