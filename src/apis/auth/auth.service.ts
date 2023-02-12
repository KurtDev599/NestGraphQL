import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(private readonly UserRepository: Repository<User>) {}

  getAccessToken() {
    return 'asdasdasd';
  }
}
