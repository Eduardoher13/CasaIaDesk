import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity({ name: 'professionals' })
export class Professional {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'user_id', type: 'uuid', unique: true })
  user_id: string;

  @Column({ type: 'text', nullable: true })
  bio: string | null;

  @Column({ name: 'years_experience', type: 'smallint', default: 0 })
  years_experience: number;

  @Column({ name: 'base_price', type: 'decimal', precision: 10, scale: 2 })
  base_price: number | null;

  @Column({ name: 'avg_rating', type: 'decimal', precision: 3, scale: 2, default: 0 })
  avg_rating: number;

  @Column({ name: 'total_reviews', type: 'int', default: 0 })
  total_reviews: number;

  @Column({ name: 'is_available', type: 'boolean', default: true })
  is_available: boolean;

  @Column({ name: 'service_radius_km', type: 'decimal', precision: 6, scale: 2, default: 20 })
  service_radius_km: number;
  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;
}
