import { MembershipService } from './memberships.service';
import { CreateMembershipDto } from './dto/create-membership.dto';
import { UpdateMembershipDto } from './dto/update-membership.dto';
export declare class MembershipController {
    private readonly service;
    constructor(service: MembershipService);
    create(createDto: CreateMembershipDto): Promise<import("./entities/membership.entity").Membership>;
    findAll(skip?: string, take?: string): Promise<[import("./entities/membership.entity").Membership[], number]>;
    findOne(id: number): Promise<import("./entities/membership.entity").Membership>;
    update(id: number, updateDto: UpdateMembershipDto): Promise<import("./entities/membership.entity").Membership>;
    remove(id: number): Promise<void>;
}
