import { User } from '../../users/entities/user.entity';
import { ServiceAssignment } from '../../service_assignments/entities/service-assignment.entity';
import { Product } from '../../products/entities/product.entity';
export declare class Review {
    id: string;
    reviewer_id: string;
    service_assignment_id: string | null;
    product_id: string | null;
    rating: number;
    comment: string | null;
    created_at: Date;
    reviewer: User;
    service_assignment: ServiceAssignment | null;
    product: Product | null;
}
