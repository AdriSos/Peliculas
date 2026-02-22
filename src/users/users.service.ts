import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';

import { UserEntity } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { generateRandomPassword } from '../utils/password.util';
import { MailService } from '../mail/mail.service';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity) private usersRepo: Repository<UserEntity>,
    private mail: MailService,
    private auth: AuthService,
    private config: ConfigService,
  ) {}

  async create(dto: CreateUserDto) {
    const existing = await this.usersRepo.findOne({ where: { email: dto.email } });
    if (existing) throw new BadRequestException('El correo ya está registrado');

    const plainPassword = generateRandomPassword(8);
    const password_hash = await bcrypt.hash(plainPassword, 10);

    const user = this.usersRepo.create({
      ...dto,
      password_hash,
      is_active: true,
      email_verified: false,
    });
    const saved = await this.usersRepo.save(user);

    const token = await this.auth.createVerificationToken(saved.id);
    const verifyLink = `${this.config.get('APP_BASE_URL')}/verify-email?token=${token}`;

    await this.mail.sendCredentialsEmail(saved.email, saved.email, plainPassword, verifyLink);

    return {
      message: 'Usuario creado. Se enviaron credenciales y link de verificación.',
      user_id: saved.id,
    };
  }

  async findAll() {
    const users = await this.usersRepo.find({ order: { id: 'DESC' } });
    return users.map(u => ({
      id: u.id,
      full_name: `${u.first_name} ${u.last_name_paternal} ${u.last_name_maternal}`,
      email: u.email,
      role: u.role,
      is_active: u.is_active,
      email_verified: u.email_verified,
      created_at: u.created_at,
    }));
  }

  async update(id: number, dto: UpdateUserDto) {
    const user = await this.usersRepo.findOne({ where: { id } });
    if (!user) throw new NotFoundException('Usuario no encontrado');

    Object.assign(user, dto);
    await this.usersRepo.save(user);
    return { message: 'Usuario actualizado' };
  }

  async setActive(id: number, is_active: boolean) {
    const user = await this.usersRepo.findOne({ where: { id } });
    if (!user) throw new NotFoundException('Usuario no encontrado');
    user.is_active = is_active;
    await this.usersRepo.save(user);
    return { message: is_active ? 'Usuario activado' : 'Usuario inactivado' };
  }

  async remove(id: number) {
    const user = await this.usersRepo.findOne({ where: { id } });
    if (!user) throw new NotFoundException('Usuario no encontrado');
    await this.usersRepo.delete(id);
    return { message: 'Usuario eliminado' };
  }
}