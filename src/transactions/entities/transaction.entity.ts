import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Order } from '../../orders/entities/order.entity';
import { ServiceAssignment } from '../../service_assignments/entities/service-assignment.entity';

@Entity({ name: 'transactions' })
export class Transaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'user_id', type: 'uuid', unique: true })
  user_id: string;

  @Column({ name: 'order_id', type: 'uuid' })
  order_id: string | null;

  @Column({ name: 'service_assignment_id', type: 'uuid' })
  service_assignment_id: string | null;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amount: number;

  @Column({ type: 'varchar', length: 50, nullable: true, default: 'pendiente' })
  status: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  gateway: string | null;
  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  created_at: Date;
  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Order, { nullable: true })
  @JoinColumn({ name: 'order_id' })
  order: Order | null;

  @ManyToOne(() => ServiceAssignment, { nullable: true })
  @JoinColumn({ name: 'service_assignment_id' })
  service_assignment: ServiceAssignment | null;
}
