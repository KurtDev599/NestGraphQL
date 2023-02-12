import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UserService } from '../users/user.service';
import { AuthService } from './auth.service';
import { HttpException, HttpStatus } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Resolver()
export class AuthResolver {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Mutation(() => String)
  async login(
    @Args('email') email: string,
    @Args('password') password: string,
  ) {
    const user = await this.userService.findOneUser({ email });
    const isAuth = await bcrypt.compare(password, user.password);

    if (!user || !isAuth) {
      throw new HttpException(
        '이메일 또는 비밀번호를 잘못 입력했습니다.',
        HttpStatus.CONFLICT,
      );
    }

    return this.authService.getAccessToken({ user });
  }
}
