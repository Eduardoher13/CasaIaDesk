import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity({ name: 'companies' })
export class Company {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'user_id', type: 'uuid', unique: true })
  user_id: string;

  @Column({ name: 'commercial_name', type: 'varchar', length: 200 })
  commercial_name: string;

  @Column({ type: 'varchar', length: 30, nullable: true, unique: true })
  ruc: string | null;

  @Column({ name: 'logo_url', type: 'text', nullable: true })
  logo_url: string | null;
  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;
}
