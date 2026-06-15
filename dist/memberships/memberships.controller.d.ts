import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { MembershipService } from './memberships.service';
import { CreateMembershipDto } from './dto/create-membership.dto';
import { UpdateMembershipDto } from './dto/update-membership.dto';
export declare class MembershipController {
    private readonly service;
    constructor(service: MembershipService);
    create(createDto: CreateMembershipDto): Promise<import("./entities/membership.entity").Membership>;
    findAll(filters: PaginationQueryDto): Promise<import("../common/pagination/pagination.util").PaginatedResult<import("./entities/membership.entity").Membership>>;
    findOne(id: number): Promise<import("./entities/membership.entity").Membership>;
    update(id: number, updateDto: UpdateMembershipDto): Promise<import("./entities/membership.entity").Membership>;
    remove(id: number): Promise<void>;
}
