import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
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

  @Column({ nullable: true, default: 0 })
  weight: number;

  @OneToMany(
    () => RefreshToken,
    (refreshToken: RefreshToken) => refreshToken.user,
  )
  refreshTokens: RefreshToken[];
}
