import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { UserService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
export declare class UserController {
    private readonly service;
    constructor(service: UserService);
    create(createDto: CreateUserDto): Promise<import("./entities/user.entity").User>;
    findAll(filters: PaginationQueryDto): Promise<import("../common/pagination/pagination.util").PaginatedResult<import("./entities/user.entity").User>>;
    findByEmail(email: string): Promise<{
        id: string;
        email: string;
        role: string;
        first_name: string;
        last_name: string;
        phone: string | null;
        avatar_url: string | null;
        is_active: boolean;
        lat: number | null;
        lng: number | null;
        city: string | null;
        created_at: Date;
        updated_at: Date;
        deleted_at: Date | null;
    }>;
    findOne(id: string): Promise<import("./entities/user.entity").User>;
    updateLocation(id: string, locationDto: UpdateLocationDto): Promise<{
        id: string;
        email: string;
        role: string;
        first_name: string;
        last_name: string;
        phone: string | null;
        avatar_url: string | null;
        is_active: boolean;
        lat: number | null;
        lng: number | null;
        city: string | null;
        created_at: Date;
        updated_at: Date;
        deleted_at: Date | null;
    }>;
    update(id: string, updateDto: UpdateUserDto): Promise<import("./entities/user.entity").User>;
    remove(id: string): Promise<void>;
}
