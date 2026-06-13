import { UserService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UserController {
    private readonly service;
    constructor(service: UserService);
    create(createDto: CreateUserDto): Promise<import("./entities/user.entity").User>;
    findAll(skip?: string, take?: string): Promise<[import("./entities/user.entity").User[], number]>;
    findOne(id: string): Promise<import("./entities/user.entity").User>;
    update(id: string, updateDto: UpdateUserDto): Promise<import("./entities/user.entity").User>;
    remove(id: string): Promise<void>;
}
