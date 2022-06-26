import { Column, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

export class Info {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  weight: number;

  @Column()
  maxCalories: number;

  @OneToOne(() => User, (user) => user.info)
  user: User;
}
