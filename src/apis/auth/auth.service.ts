import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  getAccessToken({ user }) {
    const { email, name, id } = user;
    return this.jwtService.sign(
      { email: email, name: name, sub: id },
      { secret: 'myAccessKey', expiresIn: '2h' },
    );
  }
}
