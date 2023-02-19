import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
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
    @Context() context: any,
  ) {
    const user = await this.userService.findOneUserEmail({ email });
    const isAuth = await bcrypt.compare(password, user.password);

    this.authService.setRefreshToken({ user, res: context.req.res });

    // 아이디, 비밀번호 체크
    if (!user || !isAuth) {
      throw new HttpException(
        '이메일 또는 비밀번호를 잘못 입력했습니다.',
        HttpStatus.CONFLICT,
      );
    }

    // 토큰 발급
    return this.authService.getAccessToken({ user });
  }
}
