import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from '../users/user.service';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}
  @Get('/login/google')
  @UseGuards(AuthGuard('google'))
  // google login
  async loginGoogle() {
    const user = await this.userService.findOneUserEmail({ email: '' });

    if (!user) {
      this.userService.createUser({
        email: 'email',
        password: 'password',
        name: 'name',
        age: 1,
      });
    }

    return null;
  }
}
