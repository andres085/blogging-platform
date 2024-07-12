import { UseGuards } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { BlogsService } from '../blogs/blogs.service';
import { SearchByTagArg } from '../blogs/dto/args/search.args';
import { Blog } from '../blogs/entities/blog.entity';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { ValidRoles } from '../common/enums/valid-roles.enum';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { AdminPanelService } from './admin-panel.service';

@Resolver()
@UseGuards(JwtAuthGuard)
export class AdminPanelResolver {
  constructor(
    private readonly adminPanelService: AdminPanelService,
    private readonly usersService: UsersService,
    private readonly blogsService: BlogsService,
  ) {}

  @Query(() => [User], { name: 'getAllUsers' })
  async findAllUsers(
    @CurrentUser([ValidRoles.admin]) _: User,
  ): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Query(() => [User], { name: 'getAllUsers' })
  async findAllBlogs(
    @CurrentUser([ValidRoles.admin]) _: User,
    @Args() searchByTagArg: SearchByTagArg,
  ): Promise<Blog[]> {
    return this.blogsService.findAll(searchByTagArg);
  }
}
