import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { Professional } from '../../professionals/entities/professional.entity';
import { Specialty } from '../../specialties/entities/specialty.entity';

@Entity({ name: 'professional_specialties' })
export class ProfessionalSpecialty {
  @PrimaryColumn({ name: 'professional_id', type: 'uuid' })
  professional_id: string;

  @PrimaryColumn({ name: 'specialty_id', type: 'int' })
  specialty_id: number;

  @Column({ name: 'is_primary', type: 'boolean', default: false })
  is_primary: boolean;
  @ManyToOne(() => Professional, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'professional_id' })
  professional: Professional;

  @ManyToOne(() => Specialty, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'specialty_id' })
  specialty: Specialty;
}
