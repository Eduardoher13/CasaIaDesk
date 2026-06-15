import { ProfessionalService } from './professionals.service';
import { CreateProfessionalDto } from './dto/create-professional.dto';
import { UpdateProfessionalDto } from './dto/update-professional.dto';
export declare class ProfessionalController {
    private readonly service;
    constructor(service: ProfessionalService);
    create(createDto: CreateProfessionalDto): Promise<import("./entities/professional.entity").Professional>;
    findAll(skip?: string, take?: string): Promise<[import("./entities/professional.entity").Professional[], number]>;
    findAvailable(skip?: string, take?: string): Promise<readonly [{
        user: {
            id: string;
            email: string;
            role: string;
            first_name: string;
            last_name: string;
            phone: string | null;
            avatar_url: string | null;
            is_active: boolean;
            lat: number | null;
            lng: number | null;
            city: string | null;
            created_at: Date;
            updated_at: Date;
            deleted_at: Date | null;
        };
        id: string;
        user_id: string;
        bio: string | null;
        years_experience: number;
        base_price: number | null;
        avg_rating: number;
        total_reviews: number;
        is_available: boolean;
        service_radius_km: number;
    }[], number]>;
    findByUserId(userId: string): Promise<{
        user: {
            id: string;
            email: string;
            role: string;
            first_name: string;
            last_name: string;
            phone: string | null;
            avatar_url: string | null;
            is_active: boolean;
            lat: number | null;
            lng: number | null;
            city: string | null;
            created_at: Date;
            updated_at: Date;
            deleted_at: Date | null;
        };
        id: string;
        user_id: string;
        bio: string | null;
        years_experience: number;
        base_price: number | null;
        avg_rating: number;
        total_reviews: number;
        is_available: boolean;
        service_radius_km: number;
    }>;
    findOne(id: string): Promise<import("./entities/professional.entity").Professional>;
    update(id: string, updateDto: UpdateProfessionalDto): Promise<import("./entities/professional.entity").Professional>;
    remove(id: string): Promise<void>;
}
