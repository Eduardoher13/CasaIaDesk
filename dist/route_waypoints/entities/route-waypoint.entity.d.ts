import { Delivery } from '../../deliveries/entities/delivery.entity';
export declare class RouteWaypoint {
    id: string;
    delivery_id: string;
    stop_order: number;
    address: string;
    lat: number | null;
    lng: number | null;
    is_pickup: boolean;
    arrived_at: Date | null;
    left_at: Date | null;
    delivery: Delivery;
}
