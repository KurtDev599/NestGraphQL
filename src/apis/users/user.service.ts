import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createUser({ email, password, name, age }) {
    const user = await this.userRepository.findOne({ where: { email: email } });

    if (user) {
      throw new HttpException('이미 등록된 이메일입니다.', HttpStatus.CONFLICT);
    } else {
      return await this.userRepository.save({
        email,
        password,
        name,
        age,
      });
    }
  }
}
