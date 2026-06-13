import { Repository } from 'typeorm';
import { Review } from './entities/review.entity';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
export declare class ReviewService {
    private readonly repository;
    constructor(repository: Repository<Review>);
    create(createDto: CreateReviewDto): Promise<Review>;
    findAll(skip?: number, take?: number): Promise<[Review[], number]>;
    findOne(id: string): Promise<Review>;
    update(id: string, updateDto: UpdateReviewDto): Promise<Review>;
    remove(id: string): Promise<void>;
}
