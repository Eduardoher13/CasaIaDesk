import { Delivery } from '../../deliveries/entities/delivery.entity';
export declare class DeliveryTracking {
    id: string;
    delivery_id: string;
    lat: number;
    lng: number;
    recorded_at: Date;
    delivery: Delivery;
}
