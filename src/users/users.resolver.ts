import { UseGuards } from '@nestjs/common';
import {
  Args,
  ID,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { BlogsService } from '../blogs/blogs.service';
import { SearchByTagArg } from '../blogs/dto/args/search.args';
import { Blog } from '../blogs/entities/blog.entity';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { ValidRoles } from '../common/enums/valid-roles.enum';
import { UpdateUserInput } from './dto/inputs/update-user.input';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@Resolver(() => User)
@UseGuards(JwtAuthGuard)
export class UsersResolver {
  constructor(
    private readonly usersService: UsersService,
    private readonly blogsService: BlogsService,
  ) {}

  @Query(() => User, { name: 'user' })
  async findOne(
    @CurrentUser() _: User,
    @Args('id', { type: () => ID }) id: string,
  ): Promise<User> {
    return this.usersService.findOne(id);
  }

  @Mutation(() => User, { name: 'updateUserProfile' })
  async updateUser(
    @CurrentUser() user: User,
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
  ): Promise<User> {
    return this.usersService.update(user.id, updateUserInput);
  }

  @Mutation(() => User, { name: 'blockAccount' })
  async removeUser(@CurrentUser() user: User): Promise<User> {
    return this.usersService.remove(user.id);
  }

  @ResolveField(() => [Blog], { name: 'getUserBlogs' })
  async getUserBlogs(
    @Parent() user: User,
    @Args() searchByTagArg: SearchByTagArg,
  ): Promise<Blog[]> {
    return this.blogsService.findAllByUserAndTag(user.id, searchByTagArg);
  }

  @ResolveField(() => Int, { name: 'blogsCountByUser' })
  async blogCount(
    @Parent() user: User,
    @CurrentUser([ValidRoles.admin]) _: User,
  ): Promise<number> {
    return this.blogsService.blogCountByUserId(user.id);
  }
}
