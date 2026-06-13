import { User } from '../../users/entities/user.entity';
export declare class CommunityPost {
    id: string;
    user_id: string;
    title: string | null;
    content: string;
    photos: string[] | null;
    created_at: Date;
    user: User;
}
