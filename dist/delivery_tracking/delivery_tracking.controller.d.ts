import { DeliveryTrackingService } from './delivery_tracking.service';
import { CreateDeliveryTrackingDto } from './dto/create-delivery-tracking.dto';
import { UpdateDeliveryTrackingDto } from './dto/update-delivery-tracking.dto';
export declare class DeliveryTrackingController {
    private readonly service;
    constructor(service: DeliveryTrackingService);
    create(createDto: CreateDeliveryTrackingDto): Promise<import("./entities/delivery-tracking.entity").DeliveryTracking>;
    findAll(skip?: string, take?: string): Promise<[import("./entities/delivery-tracking.entity").DeliveryTracking[], number]>;
    findOne(id: string): Promise<import("./entities/delivery-tracking.entity").DeliveryTracking>;
    update(id: string, updateDto: UpdateDeliveryTrackingDto): Promise<import("./entities/delivery-tracking.entity").DeliveryTracking>;
    remove(id: string): Promise<void>;
}
