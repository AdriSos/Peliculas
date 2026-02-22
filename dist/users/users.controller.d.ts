import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UsersController {
    private users;
    constructor(users: UsersService);
    create(dto: CreateUserDto): Promise<{
        message: string;
        user_id: number;
    }>;
    findAll(): Promise<{
        id: number;
        full_name: string;
        email: string;
        role: "admin" | "client";
        is_active: boolean;
        email_verified: boolean;
        created_at: Date;
    }[]>;
    update(id: string, dto: UpdateUserDto): Promise<{
        message: string;
    }>;
    activate(id: string): Promise<{
        message: string;
    }>;
    deactivate(id: string): Promise<{
        message: string;
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
