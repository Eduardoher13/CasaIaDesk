import { UserMembershipService } from './user_memberships.service';
import { CreateUserMembershipDto } from './dto/create-user-membership.dto';
import { UpdateUserMembershipDto } from './dto/update-user-membership.dto';
export declare class UserMembershipController {
    private readonly service;
    constructor(service: UserMembershipService);
    create(createDto: CreateUserMembershipDto): Promise<import("./entities/user-membership.entity").UserMembership>;
    findAll(skip?: string, take?: string): Promise<[import("./entities/user-membership.entity").UserMembership[], number]>;
    findOne(id: string): Promise<import("./entities/user-membership.entity").UserMembership>;
    update(id: string, updateDto: UpdateUserMembershipDto): Promise<import("./entities/user-membership.entity").UserMembership>;
    remove(id: string): Promise<void>;
}
