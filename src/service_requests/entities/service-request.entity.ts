import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Client } from '../../clients/entities/client.entity';
import { Specialty } from '../../specialties/entities/specialty.entity';

@Entity({ name: 'service_requests' })
export class ServiceRequest {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'client_id', type: 'uuid' })
  client_id: string;

  @Column({ name: 'specialty_id', type: 'int' })
  specialty_id: number;

  @Column({ type: 'varchar', length: 200 })
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'text' })
  address: string;

  @Column({ type: 'varchar', length: 50, nullable: true, default: 'pendiente' })
  status: string;

  @Column({ name: 'is_emergency', type: 'boolean', default: false })
  is_emergency: boolean;

  @Column({ name: 'preferred_date', type: 'timestamptz', nullable: true })
  preferred_date: Date | null;
  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  created_at: Date;
  @ManyToOne(() => Client)
  @JoinColumn({ name: 'client_id' })
  client: Client;

  @ManyToOne(() => Specialty)
  @JoinColumn({ name: 'specialty_id' })
  specialty: Specialty;
}
