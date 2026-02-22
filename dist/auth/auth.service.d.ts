import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from '../users/user.entity';
export declare class AuthService {
    private usersRepo;
    private jwt;
    constructor(usersRepo: Repository<UserEntity>, jwt: JwtService);
    login(email: string, password: string): Promise<{
        token: string;
        user: {
            id: number;
            full_name: string;
            email: string;
            role: "admin" | "client";
        };
    }>;
    verifyEmail(token: string): Promise<{
        message: string;
    }>;
    createVerificationToken(userId: number): Promise<string>;
}
