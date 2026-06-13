import { Repository } from 'typeorm';
import { PostComment } from './entities/post-comment.entity';
import { CreatePostCommentDto } from './dto/create-post-comment.dto';
import { UpdatePostCommentDto } from './dto/update-post-comment.dto';
export declare class PostCommentService {
    private readonly repository;
    constructor(repository: Repository<PostComment>);
    create(createDto: CreatePostCommentDto): Promise<PostComment>;
    findAll(skip?: number, take?: number): Promise<[PostComment[], number]>;
    findOne(id: string): Promise<PostComment>;
    update(id: string, updateDto: UpdatePostCommentDto): Promise<PostComment>;
    remove(id: string): Promise<void>;
}
