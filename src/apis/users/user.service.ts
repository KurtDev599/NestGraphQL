import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { use } from 'passport';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createUser({ email, password, name, age }) {
    const user = await this.findOneUserEmail({ email });

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

  async findOneUserEmail({ email }) {
    return await this.userRepository.findOne({ where: { email: email } });
  }

  async findOneUserId({ id }) {
    return await this.userRepository.findOne({ where: { id: id } });
  }

  async deleteUser({ id }) {
    const user = await this.findOneUserId({ id });

    if (!user) {
      throw new HttpException(
        '존재하지 않는 이메일 입니다.',
        HttpStatus.CONFLICT,
      );
    }
    const result = await this.userRepository.softDelete({ id: id });
    if (result) {
      await this.userRepository.update({ id: id }, { isDeleted: 'Y' });
    }
    return result.affected ? true : false;
  }
}
