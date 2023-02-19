import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  getAccessToken({ user }) {
    const { email, name, id } = user;
    return this.jwtService.sign({ email: email, name: name, sub: id });
  }

  setRefreshToken({ user, res }) {
    const { email, name, id } = user;
    const refreshToken = this.jwtService.sign({
      email: email,
      name: name,
      sub: id,
    });
    // 개발환경
    res.setHeader('Set-Cookie', `refreshToken=${refreshToken}`);

    // 운영환경
    // res.set('Access-Control-Allow-Origin', 'https://front.com');
    // res.setHeader(
    //   'Set-Cookie',
    //   `refreshToken=${refreshToken}; path=/; domain=.mybacksite.com; SameSite=None; Secure;httpOnly`,
    // );
  }
}
