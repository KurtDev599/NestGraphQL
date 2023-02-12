import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { User } from '../../apis/users/entities/user.entity';
import { UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

export class JwtAccessStrategy extends PassportStrategy(Strategy, 'myGuard') {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'myAccessKey',
    });
  }

  async validate(payload) {
    const { name } = payload;
    const user: User = await this.userRepository.findOne({
      where: { name: name },
    });
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
