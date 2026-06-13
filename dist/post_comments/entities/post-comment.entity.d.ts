import { CommunityPost } from '../../community_posts/entities/community-post.entity';
import { User } from '../../users/entities/user.entity';
export declare class PostComment {
    id: string;
    post_id: string;
    user_id: string;
    content: string;
    created_at: Date;
    post: CommunityPost;
    user: User;
}
