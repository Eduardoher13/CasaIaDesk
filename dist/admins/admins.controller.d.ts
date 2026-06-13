import { AdminService } from './admins.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
export declare class AdminController {
    private readonly service;
    constructor(service: AdminService);
    create(createDto: CreateAdminDto): Promise<import("./entities/admin.entity").Admin>;
    findAll(skip?: string, take?: string): Promise<[import("./entities/admin.entity").Admin[], number]>;
    findOne(id: string): Promise<import("./entities/admin.entity").Admin>;
    update(id: string, updateDto: UpdateAdminDto): Promise<import("./entities/admin.entity").Admin>;
    remove(id: string): Promise<void>;
}
