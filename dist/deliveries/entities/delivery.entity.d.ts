import { Order } from '../../orders/entities/order.entity';
import { User } from '../../users/entities/user.entity';
import { Vehicle } from '../../vehicles/entities/vehicle.entity';
export declare class Delivery {
    id: string;
    order_id: string;
    driver_id: string;
    vehicle_id: string | null;
    status: string;
    pickup_address: string;
    pickup_lat: number | null;
    pickup_lng: number | null;
    delivery_address: string;
    delivery_lat: number | null;
    delivery_lng: number | null;
    distance_meters: number | null;
    duration_seconds: number | null;
    polyline_encoded: string | null;
    started_at: Date | null;
    completed_at: Date | null;
    created_at: Date;
    updated_at: Date;
    order: Order;
    driver: User;
    vehicle: Vehicle | null;
}
