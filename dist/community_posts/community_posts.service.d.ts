import { Repository } from 'typeorm';
import { CommunityPost } from './entities/community-post.entity';
import { CreateCommunityPostDto } from './dto/create-community-post.dto';
import { UpdateCommunityPostDto } from './dto/update-community-post.dto';
export declare class CommunityPostService {
    private readonly repository;
    constructor(repository: Repository<CommunityPost>);
    create(createDto: CreateCommunityPostDto): Promise<CommunityPost>;
    findAll(skip?: number, take?: number): Promise<[CommunityPost[], number]>;
    findOne(id: string): Promise<CommunityPost>;
    update(id: string, updateDto: UpdateCommunityPostDto): Promise<CommunityPost>;
    remove(id: string): Promise<void>;
}
