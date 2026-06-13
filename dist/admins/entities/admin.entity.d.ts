import { User } from '../../users/entities/user.entity';
export declare class Admin {
    id: string;
    user_id: string;
    permission_level: number;
    user: User;
}
