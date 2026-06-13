export declare class CreateServiceRequestDto {
    client_id: string;
    specialty_id: number;
    title: string;
    description: string;
    address: string;
    status?: string;
    is_emergency?: boolean;
    preferred_date?: Date;
}
