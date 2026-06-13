export declare class User {
    id: string;
    email: string;
    password_hash: string;
    role: string;
    first_name: string;
    last_name: string;
    phone: string | null;
    avatar_url: string | null;
    is_active: boolean;
    lat: number | null;
    lng: number | null;
    city: string | null;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date | null;
}
