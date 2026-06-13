import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { Conversation } from '../../conversations/entities/conversation.entity';
import { User } from '../../users/entities/user.entity';

@Entity({ name: 'conversation_participants' })
export class ConversationParticipant {
  @PrimaryColumn({ name: 'conversation_id', type: 'uuid' })
  conversation_id: string;

  @PrimaryColumn({ name: 'user_id', type: 'uuid' })
  user_id: string;

  @ManyToOne(() => Conversation, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'conversation_id' })
  conversation: Conversation;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;
}
