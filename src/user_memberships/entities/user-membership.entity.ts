import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Membership } from '../../memberships/entities/membership.entity';

@Entity({ name: 'user_memberships' })
export class UserMembership {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'user_id', type: 'uuid', unique: true })
  user_id: string;

  @Column({ name: 'membership_id', type: 'int' })
  membership_id: number;

  @Column({ name: 'expires_at', type: 'timestamptz' })
  expires_at: Date;

  @Column({ name: 'auto_renew', type: 'boolean', default: true })
  auto_renew: boolean;
  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Membership)
  @JoinColumn({ name: 'membership_id' })
  membership: Membership;
}
