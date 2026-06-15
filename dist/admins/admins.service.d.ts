import { Repository } from 'typeorm';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { Admin } from './entities/admin.entity';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
export declare class AdminService {
    private readonly repository;
    constructor(repository: Repository<Admin>);
    create(createDto: CreateAdminDto): Promise<Admin>;
    findAll(filters: PaginationQueryDto): Promise<import("../common/pagination/pagination.util").PaginatedResult<Admin>>;
    findOne(id: string): Promise<Admin>;
    update(id: string, updateDto: UpdateAdminDto): Promise<Admin>;
    remove(id: string): Promise<void>;
}
