import { Repository } from 'typeorm';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { CommunityPost } from './entities/community-post.entity';
import { CreateCommunityPostDto } from './dto/create-community-post.dto';
import { UpdateCommunityPostDto } from './dto/update-community-post.dto';
export declare class CommunityPostService {
    private readonly repository;
    constructor(repository: Repository<CommunityPost>);
    create(createDto: CreateCommunityPostDto): Promise<CommunityPost>;
    findAll(filters: PaginationQueryDto): Promise<import("../common/pagination/pagination.util").PaginatedResult<CommunityPost>>;
    findOne(id: string): Promise<CommunityPost>;
    update(id: string, updateDto: UpdateCommunityPostDto): Promise<CommunityPost>;
    remove(id: string): Promise<void>;
}
