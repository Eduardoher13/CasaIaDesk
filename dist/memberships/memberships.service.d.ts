import { Repository } from 'typeorm';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { Membership } from './entities/membership.entity';
import { CreateMembershipDto } from './dto/create-membership.dto';
import { UpdateMembershipDto } from './dto/update-membership.dto';
export declare class MembershipService {
    private readonly repository;
    constructor(repository: Repository<Membership>);
    create(createDto: CreateMembershipDto): Promise<Membership>;
    findAll(filters: PaginationQueryDto): Promise<import("../common/pagination/pagination.util").PaginatedResult<Membership>>;
    findOne(id: number): Promise<Membership>;
    update(id: number, updateDto: UpdateMembershipDto): Promise<Membership>;
    remove(id: number): Promise<void>;
}
