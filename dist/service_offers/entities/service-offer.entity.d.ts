import { ServiceRequest } from '../../service_requests/entities/service-request.entity';
import { Professional } from '../../professionals/entities/professional.entity';
export declare class ServiceOffer {
    id: string;
    service_request_id: string;
    professional_id: string;
    price: number;
    message: string | null;
    is_accepted: boolean;
    created_at: Date;
    service_request: ServiceRequest;
    professional: Professional;
}
