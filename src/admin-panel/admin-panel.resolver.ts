import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { BlogsService } from '../blogs/blogs.service';
import { Blog } from '../blogs/entities/blog.entity';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { ValidRoles } from '../common/enums/valid-roles.enum';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { AdminPanelService } from './admin-panel.service';
import { AdminBlogSearchArg } from './dto/args/admin-blog-search.args';
import { DeleteUserArg } from './dto/args/delete-user.args';
import { SearchBlogByIDArg } from './dto/args/search-blog-arg';
import { PromoteUserInput } from './dto/inputs/promote-user.input';

@Resolver()
@UseGuards(JwtAuthGuard)
export class AdminPanelResolver {
  constructor(
    private readonly adminPanelService: AdminPanelService,
    private readonly usersService: UsersService,
    private readonly blogsService: BlogsService,
  ) {}

  @Query(() => [User], { name: 'findAllUsers' })
  async findAllUsers(
    @CurrentUser([ValidRoles.admin]) user: User,
  ): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Query(() => [Blog], { name: 'adminFindAllBlogs' })
  async findAllBlogs(
    @CurrentUser([ValidRoles.admin]) _: User,
    @Args() searchArgs: AdminBlogSearchArg,
  ): Promise<Blog[]> {
    return this.adminPanelService.findAllBlogs(searchArgs);
  }

  @Mutation(() => User, { name: 'modifyUserRole' })
  async updateUserRoles(
    @CurrentUser([ValidRoles.admin]) _: User,
    @Args('promoteUserInput') promoteUserInput: PromoteUserInput,
  ): Promise<User> {
    return this.adminPanelService.modifyUserRoles(promoteUserInput);
  }

  @Mutation(() => Blog, { name: 'deactivateBlog' })
  async deactivateBlog(
    @CurrentUser([ValidRoles.admin]) _: User,
    @Args() seachBlogByIDArg: SearchBlogByIDArg,
  ): Promise<Blog> {
    return this.adminPanelService.deactivateBlog(seachBlogByIDArg.blogId);
  }

  @Mutation(() => User, { name: 'deleteUser' })
  async deleteUser(
    @Args() deleteUserArg: DeleteUserArg,
    @CurrentUser([ValidRoles.admin]) _: User,
  ): Promise<User> {
    return this.usersService.deleteUser(deleteUserArg.id);
  }
}
