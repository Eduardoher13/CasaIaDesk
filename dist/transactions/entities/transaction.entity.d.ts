import { User } from '../../users/entities/user.entity';
import { Order } from '../../orders/entities/order.entity';
import { ServiceAssignment } from '../../service_assignments/entities/service-assignment.entity';
export declare class Transaction {
    id: string;
    user_id: string;
    order_id: string | null;
    service_assignment_id: string | null;
    amount: number;
    status: string;
    gateway: string | null;
    created_at: Date;
    user: User;
    order: Order | null;
    service_assignment: ServiceAssignment | null;
}
