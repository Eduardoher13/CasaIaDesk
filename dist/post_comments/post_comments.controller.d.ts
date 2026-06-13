import { PostCommentService } from './post_comments.service';
import { CreatePostCommentDto } from './dto/create-post-comment.dto';
import { UpdatePostCommentDto } from './dto/update-post-comment.dto';
export declare class PostCommentController {
    private readonly service;
    constructor(service: PostCommentService);
    create(createDto: CreatePostCommentDto): Promise<import("./entities/post-comment.entity").PostComment>;
    findAll(skip?: string, take?: string): Promise<[import("./entities/post-comment.entity").PostComment[], number]>;
    findOne(id: string): Promise<import("./entities/post-comment.entity").PostComment>;
    update(id: string, updateDto: UpdatePostCommentDto): Promise<import("./entities/post-comment.entity").PostComment>;
    remove(id: string): Promise<void>;
}
