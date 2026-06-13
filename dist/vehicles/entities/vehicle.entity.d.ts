import { User } from '../../users/entities/user.entity';
export declare class Vehicle {
    id: string;
    driver_id: string;
    plate: string;
    brand: string | null;
    model: string | null;
    type: string;
    capacity_kg: number | null;
    is_active: boolean;
    driver: User;
}
