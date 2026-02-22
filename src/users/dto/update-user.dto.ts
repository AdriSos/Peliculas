import { IsEmail, IsIn, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsOptional() @IsString() first_name?: string;
  @IsOptional() @IsString() last_name_paternal?: string;
  @IsOptional() @IsString() last_name_maternal?: string;

  @IsOptional() @IsEmail() email?: string;

  @IsOptional() @IsIn(['admin', 'client']) role?: 'admin' | 'client';
}