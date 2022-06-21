import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Food {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  calories: number;
}
