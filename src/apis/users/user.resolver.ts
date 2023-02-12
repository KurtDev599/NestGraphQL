import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GqlAuthGuard } from '../../commons/auth/gql-auth.guard';
import { CurrentUser } from '../../commons/auth/gql-user.param';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => User)
  @UseGuards(GqlAuthGuard)
  findOneUserId(@Args('id') id: string, @CurrentUser() currentUser: User) {
    console.log(currentUser);
    return this.userService.findOneUserId({ id });
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => String)
  fetchUser(@CurrentUser() currentUser: User) {
    console.log(currentUser);
    return 'hello';
  }

  @Mutation(() => User)
  async createUser(
    @Args('email') email: string,
    @Args('password') password: string,
    @Args('name') name: string,
    @Args('age') age: number,
  ) {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);
    return this.userService.createUser({
      email,
      password: hashedPassword,
      name,
      age,
    });
  }

  @Mutation(() => Boolean)
  async deleteUser(@Args('id') id: string) {
    return this.userService.deleteUser({ id });
  }
}
