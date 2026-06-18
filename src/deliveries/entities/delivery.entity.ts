import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Order } from '../../orders/entities/order.entity';
import { User } from '../../users/entities/user.entity';
import { Vehicle } from '../../vehicles/entities/vehicle.entity';

@Entity({ name: 'deliveries' })
export class Delivery {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'order_id', type: 'uuid' })
  order_id: string;

  @Column({ name: 'driver_id', type: 'uuid' })
  driver_id: string;

  @Column({ name: 'vehicle_id', type: 'uuid', nullable: true })
  vehicle_id: string | null;

  @Column({ type: 'varchar', length: 50, nullable: true, default: 'pendiente' })
  status: string;

  @Column({ name: 'pickup_address', type: 'text' })
  pickup_address: string;

  @Column({ name: 'pickup_lat', type: 'decimal', precision: 10, scale: 7, nullable: true })
  pickup_lat: number | null;

  @Column({ name: 'pickup_lng', type: 'decimal', precision: 10, scale: 7, nullable: true })
  pickup_lng: number | null;

  @Column({ name: 'delivery_address', type: 'text' })
  delivery_address: string;

  @Column({ name: 'delivery_lat', type: 'decimal', precision: 10, scale: 7, nullable: true })
  delivery_lat: number | null;

  @Column({ name: 'delivery_lng', type: 'decimal', precision: 10, scale: 7, nullable: true })
  delivery_lng: number | null;

  @Column({ name: 'distance_meters', type: 'int', nullable: true })
  distance_meters: number | null;

  @Column({ name: 'duration_seconds', type: 'int', nullable: true })
  duration_seconds: number | null;

  @Column({ name: 'polyline_encoded', type: 'text', nullable: true })
  polyline_encoded: string | null;

  @Column({ name: 'started_at', type: 'timestamptz', nullable: true })
  started_at: Date | null;

  @Column({ name: 'completed_at', type: 'timestamptz', nullable: true })
  completed_at: Date | null;
  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updated_at: Date;
  @ManyToOne(() => Order, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'order_id' })
  order: Order;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'driver_id' })
  driver: User;

  @ManyToOne(() => Vehicle, { nullable: true })
  @JoinColumn({ name: 'vehicle_id' })
  vehicle: Vehicle | null;
}
