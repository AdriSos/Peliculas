import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
export declare class AuthController {
    private auth;
    constructor(auth: AuthService);
    login(dto: LoginDto): Promise<{
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
}
