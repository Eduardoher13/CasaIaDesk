import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UserService {
    private readonly repository;
    constructor(repository: Repository<User>);
    create(createDto: CreateUserDto): Promise<User>;
    findAll(skip?: number, take?: number): Promise<[User[], number]>;
    findOne(id: string): Promise<User>;
    update(id: string, updateDto: UpdateUserDto): Promise<User>;
    remove(id: string): Promise<void>;
}
