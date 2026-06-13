import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'memberships' })
export class Membership {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50, unique: true })
  plan: string;

  @Column({ type: 'varchar', length: 200 })
  name: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column({ name: 'duration_days', type: 'smallint', default: 30 })
  duration_days: number;

  @Column({ type: 'text', nullable: true })
  description: string | null;
}
