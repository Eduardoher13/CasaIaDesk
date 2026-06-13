import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ServiceRequest } from '../../service_requests/entities/service-request.entity';
import { Professional } from '../../professionals/entities/professional.entity';

@Entity({ name: 'service_offers' })
export class ServiceOffer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'service_request_id', type: 'uuid', unique: true })
  service_request_id: string;

  @Column({ name: 'professional_id', type: 'uuid' })
  professional_id: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column({ type: 'text', nullable: true })
  message: string | null;

  @Column({ name: 'is_accepted', type: 'boolean', default: false })
  is_accepted: boolean;
  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  created_at: Date;
  @ManyToOne(() => ServiceRequest, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'service_request_id' })
  service_request: ServiceRequest;

  @ManyToOne(() => Professional)
  @JoinColumn({ name: 'professional_id' })
  professional: Professional;
}
