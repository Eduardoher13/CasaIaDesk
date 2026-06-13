import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Delivery } from '../../deliveries/entities/delivery.entity';

@Entity({ name: 'route_waypoints' })
export class RouteWaypoint {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'delivery_id', type: 'uuid' })
  delivery_id: string;

  @Column({ name: 'stop_order', type: 'smallint' })
  stop_order: number;

  @Column({ type: 'text' })
  address: string;

  @Column({ type: 'decimal', precision: 10, scale: 7, nullable: true })
  lat: number | null;

  @Column({ type: 'decimal', precision: 10, scale: 7, nullable: true })
  lng: number | null;

  @Column({ name: 'is_pickup', type: 'boolean', default: false })
  is_pickup: boolean;

  @Column({ name: 'arrived_at', type: 'timestamptz', nullable: true })
  arrived_at: Date | null;

  @Column({ name: 'left_at', type: 'timestamptz', nullable: true })
  left_at: Date | null;
  @ManyToOne(() => Delivery, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'delivery_id' })
  delivery: Delivery;
}
