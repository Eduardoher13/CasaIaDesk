import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { CommunityPostService } from './community_posts.service';
import { CreateCommunityPostDto } from './dto/create-community-post.dto';
import { UpdateCommunityPostDto } from './dto/update-community-post.dto';
export declare class CommunityPostController {
    private readonly service;
    constructor(service: CommunityPostService);
    create(createDto: CreateCommunityPostDto): Promise<import("./entities/community-post.entity").CommunityPost>;
    findAll(filters: PaginationQueryDto): Promise<import("../common/pagination/pagination.util").PaginatedResult<import("./entities/community-post.entity").CommunityPost>>;
    findOne(id: string): Promise<import("./entities/community-post.entity").CommunityPost>;
    update(id: string, updateDto: UpdateCommunityPostDto): Promise<import("./entities/community-post.entity").CommunityPost>;
    remove(id: string): Promise<void>;
}
