import { Company } from '../../companies/entities/company.entity';
export declare class Product {
    id: string;
    company_id: string;
    name: string;
    description: string | null;
    price: number;
    stock: number;
    avg_rating: number;
    is_active: boolean;
    company: Company;
}
