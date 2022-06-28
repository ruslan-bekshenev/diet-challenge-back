import { HealthyDay } from 'src/healthy-day/healthy-day.entity';
import { Meal } from 'src/meal/meal.entity';
import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Info } from './info.entity';
import { RefreshToken } from './refreshtoken.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ nullable: false })
  password: string;

  @Column({ nullable: true, default: '' })
  firstName: string;

  @Column({ nullable: true, default: '' })
  lastName: string;

  @OneToMany(
    () => RefreshToken,
    (refreshToken: RefreshToken) => refreshToken.user,
  )
  refreshTokens: RefreshToken[];

  @OneToMany(() => HealthyDay, (healthyDay) => healthyDay.user)
  healthyDay: Meal[];

  @OneToOne(() => Info, (info) => info.user, { cascade: true })
  info: Info;
}
