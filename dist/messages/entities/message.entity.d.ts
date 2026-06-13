import { Conversation } from '../../conversations/entities/conversation.entity';
import { User } from '../../users/entities/user.entity';
export declare class Message {
    id: string;
    conversation_id: string;
    sender_id: string;
    type: string;
    content: string | null;
    file_url: string | null;
    is_read: boolean;
    created_at: Date;
    conversation: Conversation;
    sender: User;
}
