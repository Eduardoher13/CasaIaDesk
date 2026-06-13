import { Client } from '../../clients/entities/client.entity';
import { Specialty } from '../../specialties/entities/specialty.entity';
export declare class ServiceRequest {
    id: string;
    client_id: string;
    specialty_id: number;
    title: string;
    description: string;
    address: string;
    status: string;
    is_emergency: boolean;
    preferred_date: Date | null;
    created_at: Date;
    client: Client;
    specialty: Specialty;
}
