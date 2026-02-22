import { IsEmail, IsIn, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MinLength(1)
  first_name: string;

  @IsString()
  @MinLength(1)
  last_name_paternal: string;

  @IsString()
  @MinLength(1)
  last_name_maternal: string;

  @IsEmail()
  email: string;

  @IsIn(['admin', 'client'])
  role: 'admin' | 'client';
}