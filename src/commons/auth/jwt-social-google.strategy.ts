import { PassportStrategy } from '@nestjs/passport';
import { User } from '../../apis/users/entities/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Strategy } from 'passport-google-oauth20';

@Injectable()
export class jwtSocialGoogleStrategy extends PassportStrategy(
  Strategy,
  'google',
) {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {
    super({
      clientID: '',
      clientSecret: '',
      callbackURL: '', // 호출 api
      scope: ['email', 'profile'],
    });
  }

  async validate(accessToken, refreshToken, profile) {
    console.log(accessToken);
    console.log(refreshToken);
    console.log(profile);
    return null;
  }
}
