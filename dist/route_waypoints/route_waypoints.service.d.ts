import { Repository } from 'typeorm';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { RouteWaypoint } from './entities/route-waypoint.entity';
import { CreateRouteWaypointDto } from './dto/create-route-waypoint.dto';
import { UpdateRouteWaypointDto } from './dto/update-route-waypoint.dto';
export declare class RouteWaypointService {
    private readonly repository;
    constructor(repository: Repository<RouteWaypoint>);
    create(createDto: CreateRouteWaypointDto): Promise<RouteWaypoint>;
    findAll(filters: PaginationQueryDto): Promise<import("../common/pagination/pagination.util").PaginatedResult<RouteWaypoint>>;
    findOne(id: string): Promise<RouteWaypoint>;
    update(id: string, updateDto: UpdateRouteWaypointDto): Promise<RouteWaypoint>;
    remove(id: string): Promise<void>;
}
