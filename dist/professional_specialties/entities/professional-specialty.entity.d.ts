import { Professional } from '../../professionals/entities/professional.entity';
import { Specialty } from '../../specialties/entities/specialty.entity';
export declare class ProfessionalSpecialty {
    professional_id: string;
    specialty_id: number;
    is_primary: boolean;
    professional: Professional;
    specialty: Specialty;
}
