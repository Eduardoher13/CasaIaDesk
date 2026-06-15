import { Repository } from 'typeorm';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { PostComment } from './entities/post-comment.entity';
import { CreatePostCommentDto } from './dto/create-post-comment.dto';
import { UpdatePostCommentDto } from './dto/update-post-comment.dto';
export declare class PostCommentService {
    private readonly repository;
    constructor(repository: Repository<PostComment>);
    create(createDto: CreatePostCommentDto): Promise<PostComment>;
    findAll(filters: PaginationQueryDto): Promise<import("../common/pagination/pagination.util").PaginatedResult<PostComment>>;
    findOne(id: string): Promise<PostComment>;
    update(id: string, updateDto: UpdatePostCommentDto): Promise<PostComment>;
    remove(id: string): Promise<void>;
}
