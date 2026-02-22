import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { nanoid } from 'nanoid';

import { UserEntity } from '../users/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity) private usersRepo: Repository<UserEntity>,
    private jwt: JwtService,
  ) {}

  async login(email: string, password: string) {
    const user = await this.usersRepo.findOne({ where: { email } });
    if (!user) throw new UnauthorizedException('Credenciales inválidas');

    if (!user.is_active) throw new UnauthorizedException('Usuario inactivo');
    if (!user.email_verified) throw new UnauthorizedException('Correo no verificado');

    const ok = await bcrypt.compare(password, user.password_hash);
    if (!ok) throw new UnauthorizedException('Credenciales inválidas');

    const token = this.jwt.sign({ sub: user.id, email: user.email, role: user.role });
    return {
      token,
      user: {
        id: user.id,
        full_name: `${user.first_name} ${user.last_name_paternal} ${user.last_name_maternal}`,
        email: user.email,
        role: user.role,
      },
    };
  }

  async verifyEmail(token: string) {
    const user = await this.usersRepo.findOne({ where: { email_verification_token: token } });
    if (!user) throw new BadRequestException('Token inválido');

    user.email_verified = true;
    user.email_verification_token = null;
    await this.usersRepo.save(user);

    return { message: 'Correo verificado correctamente' };
  }

  async createVerificationToken(userId: number) {
    const token = nanoid(32);
    await this.usersRepo.update(userId, { email_verification_token: token, email_verified: false });
    return token;
  }
}