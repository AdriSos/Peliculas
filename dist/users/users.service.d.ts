import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { UserEntity } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { MailService } from '../mail/mail.service';
import { AuthService } from '../auth/auth.service';
export declare class UsersService {
    private usersRepo;
    private mail;
    private auth;
    private config;
    constructor(usersRepo: Repository<UserEntity>, mail: MailService, auth: AuthService, config: ConfigService);
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
    update(id: number, dto: UpdateUserDto): Promise<{
        message: string;
    }>;
    setActive(id: number, is_active: boolean): Promise<{
        message: string;
    }>;
    remove(id: number): Promise<{
        message: string;
    }>;
}
