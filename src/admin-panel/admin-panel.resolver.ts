import { UseGuards } from '@nestjs/common';
import { Query, Resolver } from '@nestjs/graphql';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
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
  ) {}

  @Query(() => [User], { name: 'getAllUsers' })
  async findAll(@CurrentUser([ValidRoles.admin]) _: User): Promise<User[]> {
    return this.usersService.findAll();
  }
}
