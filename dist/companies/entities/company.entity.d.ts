import { User } from '../../users/entities/user.entity';
export declare class Company {
    id: string;
    user_id: string;
    commercial_name: string;
    ruc: string | null;
    logo_url: string | null;
    user: User;
}
