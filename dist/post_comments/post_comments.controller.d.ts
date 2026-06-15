import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { PostCommentService } from './post_comments.service';
import { CreatePostCommentDto } from './dto/create-post-comment.dto';
import { UpdatePostCommentDto } from './dto/update-post-comment.dto';
export declare class PostCommentController {
    private readonly service;
    constructor(service: PostCommentService);
    create(createDto: CreatePostCommentDto): Promise<import("./entities/post-comment.entity").PostComment>;
    findAll(filters: PaginationQueryDto): Promise<import("../common/pagination/pagination.util").PaginatedResult<import("./entities/post-comment.entity").PostComment>>;
    findOne(id: string): Promise<import("./entities/post-comment.entity").PostComment>;
    update(id: string, updateDto: UpdatePostCommentDto): Promise<import("./entities/post-comment.entity").PostComment>;
    remove(id: string): Promise<void>;
}
