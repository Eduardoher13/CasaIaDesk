import { Repository } from 'typeorm';
import { UserMembership } from './entities/user-membership.entity';
import { CreateUserMembershipDto } from './dto/create-user-membership.dto';
import { UpdateUserMembershipDto } from './dto/update-user-membership.dto';
export declare class UserMembershipService {
    private readonly repository;
    constructor(repository: Repository<UserMembership>);
    create(createDto: CreateUserMembershipDto): Promise<UserMembership>;
    findAll(skip?: number, take?: number): Promise<[UserMembership[], number]>;
    findOne(id: string): Promise<UserMembership>;
    update(id: string, updateDto: UpdateUserMembershipDto): Promise<UserMembership>;
    remove(id: string): Promise<void>;
}
