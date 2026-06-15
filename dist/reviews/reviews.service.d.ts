import { Repository } from 'typeorm';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { Review } from './entities/review.entity';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
export declare class ReviewService {
    private readonly repository;
    constructor(repository: Repository<Review>);
    create(createDto: CreateReviewDto): Promise<Review>;
    findAll(filters: PaginationQueryDto): Promise<import("../common/pagination/pagination.util").PaginatedResult<Review>>;
    findOne(id: string): Promise<Review>;
    update(id: string, updateDto: UpdateReviewDto): Promise<Review>;
    remove(id: string): Promise<void>;
}
