import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { RouteWaypointService } from './route_waypoints.service';
import { CreateRouteWaypointDto } from './dto/create-route-waypoint.dto';
import { UpdateRouteWaypointDto } from './dto/update-route-waypoint.dto';
export declare class RouteWaypointController {
    private readonly service;
    constructor(service: RouteWaypointService);
    create(createDto: CreateRouteWaypointDto): Promise<import("./entities/route-waypoint.entity").RouteWaypoint>;
    findAll(filters: PaginationQueryDto): Promise<import("../common/pagination/pagination.util").PaginatedResult<import("./entities/route-waypoint.entity").RouteWaypoint>>;
    findOne(id: string): Promise<import("./entities/route-waypoint.entity").RouteWaypoint>;
    update(id: string, updateDto: UpdateRouteWaypointDto): Promise<import("./entities/route-waypoint.entity").RouteWaypoint>;
    remove(id: string): Promise<void>;
}
