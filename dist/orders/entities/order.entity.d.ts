import { Client } from '../../clients/entities/client.entity';
export declare class Order {
    id: string;
    client_id: string;
    status: string;
    total: number;
    paid_at: Date | null;
    created_at: Date;
    client: Client;
}
