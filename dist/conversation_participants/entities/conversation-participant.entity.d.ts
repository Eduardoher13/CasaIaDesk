import { Conversation } from '../../conversations/entities/conversation.entity';
import { User } from '../../users/entities/user.entity';
export declare class ConversationParticipant {
    conversation_id: string;
    user_id: string;
    conversation: Conversation;
    user: User;
}
