import { CommunityPostService } from './community_posts.service';
import { CreateCommunityPostDto } from './dto/create-community-post.dto';
import { UpdateCommunityPostDto } from './dto/update-community-post.dto';
export declare class CommunityPostController {
    private readonly service;
    constructor(service: CommunityPostService);
    create(createDto: CreateCommunityPostDto): Promise<import("./entities/community-post.entity").CommunityPost>;
    findAll(skip?: string, take?: string): Promise<[import("./entities/community-post.entity").CommunityPost[], number]>;
    findOne(id: string): Promise<import("./entities/community-post.entity").CommunityPost>;
    update(id: string, updateDto: UpdateCommunityPostDto): Promise<import("./entities/community-post.entity").CommunityPost>;
    remove(id: string): Promise<void>;
}
