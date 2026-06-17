import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';

export interface JwtPayload {
  sub: string;
  email: string;
  role: string;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    const user = await this.userService.findByEmailWithPassword(
      loginDto.email,
    );

    if (!user || !user.is_active) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const passwordMatches = await bcrypt.compare(
      loginDto.password,
      user.password_hash,
    );

    if (!passwordMatches) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const payload: JwtPayload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };

    const safeUser = this.userService.toSafeUser(user);

    return {
      access_token: await this.jwtService.signAsync(payload),
      user: {
        id: safeUser.id,
        email: safeUser.email,
        role: safeUser.role,
        first_name: safeUser.first_name,
        last_name: safeUser.last_name,
        avatar_url: safeUser.avatar_url,
      },
    };
  }

  async getProfile(userId: string) {
    const user = await this.userService.findOne(userId);
    return this.userService.toSafeUser(user);
  }
}
