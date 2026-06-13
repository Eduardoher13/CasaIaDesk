import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity({ name: 'vehicles' })
export class Vehicle {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'driver_id', type: 'uuid' })
  driver_id: string;

  @Column({ type: 'varchar', length: 20, unique: true })
  plate: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  brand: string | null;

  @Column({ type: 'varchar', length: 100, nullable: true })
  model: string | null;

  @Column({ type: 'varchar', length: 20, nullable: true, default: 'camioneta' })
  type: string;

  @Column({ name: 'capacity_kg', type: 'decimal', precision: 8, scale: 2, nullable: true })
  capacity_kg: number | null;

  @Column({ name: 'is_active', type: 'boolean', default: true })
  is_active: boolean;
  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'driver_id' })
  driver: User;
}
