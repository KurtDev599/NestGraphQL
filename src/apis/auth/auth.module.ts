import { Module } from '@nestjs/common';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { UserService } from '../users/user.service';
import { PassportModule } from '@nestjs/passport';
import { JwtRefreshStrategy } from '../../commons/auth/jwt-refresh.strategy';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    JwtModule.register({
      secret: 'myAccessKey',
      signOptions: {
        expiresIn: 60 * 2,
      },
    }),
    TypeOrmModule.forFeature([User]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  providers: [AuthResolver, AuthService, UserService, JwtRefreshStrategy],
  exports: [PassportModule],
  controllers: [AuthController],
})
export class AuthModule {}
