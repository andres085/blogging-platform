import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { BlogsService } from '../blogs/blogs.service';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { ValidRoles } from '../common/enums/valid-roles.enum';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { AdminPanelService } from './admin-panel.service';
import { DeleteUserArg } from './dto/args/delete-user.args';

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

  @Mutation(() => User, { name: 'deleteUser' })
  async deleteUser(
    @Args() deleteUserArg: DeleteUserArg,
    @CurrentUser([ValidRoles.admin]) user: User,
  ): Promise<User> {
    return this.usersService.deleteUser(deleteUserArg.id);
  }
}
