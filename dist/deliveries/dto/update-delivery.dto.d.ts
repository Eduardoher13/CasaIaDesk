export declare class UpdateDeliveryDto {
    order_id?: string;
    driver_id?: string;
    vehicle_id?: string;
    status?: string;
    pickup_address?: string;
    pickup_lat?: number;
    pickup_lng?: number;
    delivery_address?: string;
    delivery_lat?: number;
    delivery_lng?: number;
    distance_meters?: number;
    duration_seconds?: number;
    polyline_encoded?: string;
    started_at?: Date;
    completed_at?: Date;
}
