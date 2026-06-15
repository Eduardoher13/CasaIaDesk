import { Repository } from 'typeorm';
import { Professional } from './entities/professional.entity';
import { CreateProfessionalDto } from './dto/create-professional.dto';
import { UpdateProfessionalDto } from './dto/update-professional.dto';
export declare class ProfessionalService {
    private readonly repository;
    constructor(repository: Repository<Professional>);
    create(createDto: CreateProfessionalDto): Promise<Professional>;
    findAll(skip?: number, take?: number): Promise<[Professional[], number]>;
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
    findAvailable(skip?: number, take?: number): Promise<readonly [{
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
    findOne(id: string): Promise<Professional>;
    update(id: string, updateDto: UpdateProfessionalDto): Promise<Professional>;
    remove(id: string): Promise<void>;
    private sanitizeProfessional;
}
