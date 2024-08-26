import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Blog } from '../blogs/entities/blog.entity';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { ValidRoles } from '../common/enums/valid-roles.enum';
import { Flag } from '../flags/entities/flag.entity';
import { FlagsService } from '../flags/flags.service';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { AdminPanelService } from './admin-panel.service';
import { AdminBlogSearchArg } from './dto/args/admin-blog-search.args';
import { SearchFlagsArgs } from './dto/args/admin-flag-search.args';
import { DeleteUserArg } from './dto/args/delete-user.args';
import { SearchBlogByIDArg } from './dto/args/search-blog-arg';
import { FeatureBlogInput } from './dto/inputs/feature-blog.input';
import { PromoteUserInput } from './dto/inputs/promote-user.input';
import { UpdateFlagStatusArgs } from './dto/inputs/update-flag.input';
import { ParsedFlag } from './dto/responses/flags-response';

@Resolver()
@UseGuards(JwtAuthGuard)
export class AdminPanelResolver {
  constructor(
    private readonly adminPanelService: AdminPanelService,
    private readonly usersService: UsersService,
    private readonly flagsService: FlagsService,
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
    @Args() searchBlogById: SearchBlogByIDArg,
  ): Promise<Blog> {
    return this.adminPanelService.deactivateBlog(searchBlogById.blogId);
  }

  @Mutation(() => Blog, { name: 'deleteBlog' })
  async deleteBlog(
    @CurrentUser([ValidRoles.admin]) _: User,
    @Args() seachBlogByIDArg: SearchBlogByIDArg,
  ): Promise<Blog> {
    return this.adminPanelService.deleteBlog(seachBlogByIDArg.blogId);
  }

  @Mutation(() => User, { name: 'deleteUser' })
  async deleteUser(
    @Args() deleteUserArg: DeleteUserArg,
    @CurrentUser([ValidRoles.admin]) _: User,
  ): Promise<User> {
    return this.usersService.deleteUser(deleteUserArg.id);
  }

  @Mutation(() => User, { name: 'deactivateUser' })
  async deactivateUser(
    @Args() deleteUserArg: DeleteUserArg,
    @CurrentUser([ValidRoles.admin]) _: User,
  ): Promise<User> {
    return this.usersService.remove(deleteUserArg.id);
  }

  @Mutation(() => Blog, { name: 'changeFeatureBlog' })
  async changeFeatureBlog(
    @Args('featureBlog') featureBlog: FeatureBlogInput,
    @CurrentUser([ValidRoles.admin]) _: User,
  ): Promise<Blog> {
    return this.adminPanelService.changeFeatureBlog(featureBlog);
  }

  @Query(() => [ParsedFlag], { name: 'findFlagsByEntityAndStatus' })
  async findAllFlags(
    @CurrentUser([ValidRoles.admin]) _: User,
    @Args() searchFlagsArgs: SearchFlagsArgs,
  ): Promise<ParsedFlag[]> {
    return this.flagsService.findFlags(searchFlagsArgs);
  }

  @Mutation(() => Flag, { name: 'updateFlagStatus' })
  async updateFlagStatus(
    @Args('updateFlagStatusArgs') updateFlagStatusArgs: UpdateFlagStatusArgs,
    @CurrentUser([ValidRoles.admin]) _: User,
  ): Promise<Flag> {
    return this.flagsService.updateFlagStatus(updateFlagStatusArgs);
  }
}
