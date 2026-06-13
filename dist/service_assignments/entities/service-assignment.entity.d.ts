import { ServiceRequest } from '../../service_requests/entities/service-request.entity';
import { ServiceOffer } from '../../service_offers/entities/service-offer.entity';
import { Professional } from '../../professionals/entities/professional.entity';
import { Client } from '../../clients/entities/client.entity';
export declare class ServiceAssignment {
    id: string;
    service_request_id: string;
    service_offer_id: string;
    professional_id: string;
    client_id: string;
    final_price: number;
    started_at: Date | null;
    completed_at: Date | null;
    service_request: ServiceRequest;
    service_offer: ServiceOffer;
    professional: Professional;
    client: Client;
}
