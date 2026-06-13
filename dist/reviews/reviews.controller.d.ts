import { ReviewService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
export declare class ReviewController {
    private readonly service;
    constructor(service: ReviewService);
    create(createDto: CreateReviewDto): Promise<import("./entities/review.entity").Review>;
    findAll(skip?: string, take?: string): Promise<[import("./entities/review.entity").Review[], number]>;
    findOne(id: string): Promise<import("./entities/review.entity").Review>;
    update(id: string, updateDto: UpdateReviewDto): Promise<import("./entities/review.entity").Review>;
    remove(id: string): Promise<void>;
}
