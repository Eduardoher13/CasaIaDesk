import { User } from '../../users/entities/user.entity';
export declare class Professional {
    id: string;
    user_id: string;
    bio: string | null;
    years_experience: number;
    base_price: number | null;
    avg_rating: number;
    total_reviews: number;
    is_available: boolean;
    service_radius_km: number;
    user: User;
}
