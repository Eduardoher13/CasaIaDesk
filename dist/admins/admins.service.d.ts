import { Repository } from 'typeorm';
import { Admin } from './entities/admin.entity';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
export declare class AdminService {
    private readonly repository;
    constructor(repository: Repository<Admin>);
    create(createDto: CreateAdminDto): Promise<Admin>;
    findAll(skip?: number, take?: number): Promise<[Admin[], number]>;
    findOne(id: string): Promise<Admin>;
    update(id: string, updateDto: UpdateAdminDto): Promise<Admin>;
    remove(id: string): Promise<void>;
}
