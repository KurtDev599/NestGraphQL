import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from '../users/user.service';
import { AuthService } from './auth.service';
import { User } from '../users/entities/user.entity';

interface IOAuthUser {
  user: Pick<User, 'email' | 'password' | 'name' | 'age'>;
}

@Controller('auth')
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Get('/login/google')
  @UseGuards(AuthGuard('google'))
  // google login
  async loginGoogle(@Req() req: Request & IOAuthUser, @Res() res: Response) {
    const user = await this.userService.findOneUserEmail({
      email: req.user.email,
    });

    if (!user) {
      this.userService.createUser({
        email: req.user.email,
        password: req.user.password,
        name: req.user.name,
        age: req.user.age,
      });
    }

    this.authService.setRefreshToken({ user, res });
    // res.redirect('http://localhost:8080/src/apis/auth/test.html');

    return null;
  }
}
