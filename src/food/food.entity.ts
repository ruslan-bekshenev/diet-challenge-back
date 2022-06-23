import { Meal } from 'src/meal/meal.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Food {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  calories: number;

  @OneToMany(() => Meal, (meal) => meal.id)
  meal: Meal[];
}
