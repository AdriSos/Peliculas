export declare class UserEntity {
    id: number;
    first_name: string;
    last_name_paternal: string;
    last_name_maternal: string;
    email: string;
    role: 'admin' | 'client';
    password_hash: string;
    is_active: boolean;
    email_verified: boolean;
    email_verification_token: string | null;
    created_at: Date;
    updated_at: Date;
}
