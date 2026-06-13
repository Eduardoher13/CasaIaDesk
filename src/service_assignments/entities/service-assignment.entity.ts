import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ServiceRequest } from '../../service_requests/entities/service-request.entity';
import { ServiceOffer } from '../../service_offers/entities/service-offer.entity';
import { Professional } from '../../professionals/entities/professional.entity';
import { Client } from '../../clients/entities/client.entity';

@Entity({ name: 'service_assignments' })
export class ServiceAssignment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'service_request_id', type: 'uuid', unique: true })
  service_request_id: string;

  @Column({ name: 'service_offer_id', type: 'uuid', unique: true })
  service_offer_id: string;

  @Column({ name: 'professional_id', type: 'uuid' })
  professional_id: string;

  @Column({ name: 'client_id', type: 'uuid' })
  client_id: string;

  @Column({ name: 'final_price', type: 'decimal', precision: 10, scale: 2 })
  final_price: number;

  @Column({ name: 'started_at', type: 'timestamptz', nullable: true })
  started_at: Date | null;

  @Column({ name: 'completed_at', type: 'timestamptz', nullable: true })
  completed_at: Date | null;
  @ManyToOne(() => ServiceRequest)
  @JoinColumn({ name: 'service_request_id' })
  service_request: ServiceRequest;

  @ManyToOne(() => ServiceOffer)
  @JoinColumn({ name: 'service_offer_id' })
  service_offer: ServiceOffer;

  @ManyToOne(() => Professional)
  @JoinColumn({ name: 'professional_id' })
  professional: Professional;

  @ManyToOne(() => Client)
  @JoinColumn({ name: 'client_id' })
  client: Client;
}
