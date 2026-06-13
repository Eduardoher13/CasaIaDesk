import { User } from '../../users/entities/user.entity';
import { Membership } from '../../memberships/entities/membership.entity';
export declare class UserMembership {
    id: string;
    user_id: string;
    membership_id: number;
    expires_at: Date;
    auto_renew: boolean;
    user: User;
    membership: Membership;
}
