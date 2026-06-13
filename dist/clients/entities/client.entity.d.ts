import { User } from '../../users/entities/user.entity';
export declare class Client {
    id: string;
    user_id: string;
    address: string | null;
    points_balance: number;
    user: User;
}
