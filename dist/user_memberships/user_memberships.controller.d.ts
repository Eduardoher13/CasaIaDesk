import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { UserMembershipService } from './user_memberships.service';
import { CreateUserMembershipDto } from './dto/create-user-membership.dto';
import { UpdateUserMembershipDto } from './dto/update-user-membership.dto';
export declare class UserMembershipController {
    private readonly service;
    constructor(service: UserMembershipService);
    create(createDto: CreateUserMembershipDto): Promise<import("./entities/user-membership.entity").UserMembership>;
    findAll(filters: PaginationQueryDto): Promise<import("../common/pagination/pagination.util").PaginatedResult<import("./entities/user-membership.entity").UserMembership>>;
    findOne(id: string): Promise<import("./entities/user-membership.entity").UserMembership>;
    update(id: string, updateDto: UpdateUserMembershipDto): Promise<import("./entities/user-membership.entity").UserMembership>;
    remove(id: string): Promise<void>;
}
