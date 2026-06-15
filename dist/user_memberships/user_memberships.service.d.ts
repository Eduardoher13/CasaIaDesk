import { Repository } from 'typeorm';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { UserMembership } from './entities/user-membership.entity';
import { CreateUserMembershipDto } from './dto/create-user-membership.dto';
import { UpdateUserMembershipDto } from './dto/update-user-membership.dto';
export declare class UserMembershipService {
    private readonly repository;
    constructor(repository: Repository<UserMembership>);
    create(createDto: CreateUserMembershipDto): Promise<UserMembership>;
    findAll(filters: PaginationQueryDto): Promise<import("../common/pagination/pagination.util").PaginatedResult<UserMembership>>;
    findOne(id: string): Promise<UserMembership>;
    update(id: string, updateDto: UpdateUserMembershipDto): Promise<UserMembership>;
    remove(id: string): Promise<void>;
}
