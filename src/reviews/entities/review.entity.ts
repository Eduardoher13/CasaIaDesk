import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { ServiceAssignment } from '../../service_assignments/entities/service-assignment.entity';
import { Product } from '../../products/entities/product.entity';

@Entity({ name: 'reviews' })
export class Review {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'reviewer_id', type: 'uuid' })
  reviewer_id: string;

  @Column({ name: 'service_assignment_id', type: 'uuid' })
  service_assignment_id: string | null;

  @Column({ name: 'product_id', type: 'uuid' })
  product_id: string | null;

  @Column({ type: 'smallint' })
  rating: number;

  @Column({ type: 'text', nullable: true })
  comment: string | null;
  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  created_at: Date;
  @ManyToOne(() => User)
  @JoinColumn({ name: 'reviewer_id' })
  reviewer: User;

  @ManyToOne(() => ServiceAssignment, { nullable: true })
  @JoinColumn({ name: 'service_assignment_id' })
  service_assignment: ServiceAssignment | null;

  @ManyToOne(() => Product, { nullable: true })
  @JoinColumn({ name: 'product_id' })
  product: Product | null;
}
