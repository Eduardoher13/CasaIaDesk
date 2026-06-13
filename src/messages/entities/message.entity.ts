import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Conversation } from '../../conversations/entities/conversation.entity';
import { User } from '../../users/entities/user.entity';

@Entity({ name: 'messages' })
export class Message {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'conversation_id', type: 'uuid' })
  conversation_id: string;

  @Column({ name: 'sender_id', type: 'uuid' })
  sender_id: string;

  @Column({ type: 'varchar', length: 20, nullable: true, default: 'texto' })
  type: string;

  @Column({ type: 'text', nullable: true })
  content: string | null;

  @Column({ name: 'file_url', type: 'text', nullable: true })
  file_url: string | null;

  @Column({ name: 'is_read', type: 'boolean', default: false })
  is_read: boolean;
  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  created_at: Date;
  @ManyToOne(() => Conversation, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'conversation_id' })
  conversation: Conversation;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'sender_id' })
  sender: User;
}
