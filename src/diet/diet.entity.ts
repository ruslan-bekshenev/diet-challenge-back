import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Diet {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'timestamp without time zone' })
  date: Date;

  @Column({ nullable: false, default: 1 })
  count: number;
}
