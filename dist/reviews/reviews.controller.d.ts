import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { ReviewService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
export declare class ReviewController {
    private readonly service;
    constructor(service: ReviewService);
    create(createDto: CreateReviewDto): Promise<import("./entities/review.entity").Review>;
    findAll(filters: PaginationQueryDto): Promise<import("../common/pagination/pagination.util").PaginatedResult<import("./entities/review.entity").Review>>;
    findOne(id: string): Promise<import("./entities/review.entity").Review>;
    update(id: string, updateDto: UpdateReviewDto): Promise<import("./entities/review.entity").Review>;
    remove(id: string): Promise<void>;
}
