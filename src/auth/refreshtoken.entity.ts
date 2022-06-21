import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { User } from './user.entity';

@Entity('refresh_tokens')
export class RefreshToken {
  @PrimaryColumn({ type: 'uuid', generated: 'uuid' })
  uuid: string;

  @Column()
  userUuid: string;

  @Column({ nullable: false })
  email: string;

  @Column()
  token: string;

  @Column('date')
  expiresIn: Date;

  @ManyToOne(() => User, (user: User) => user.refreshTokens, {
    onDelete: 'CASCADE',
  })
  user: User;
}
