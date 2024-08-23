import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { User } from '../users/entities/user.entity';
import { CreateFlagInput } from './dto/create-flag.input';
import { Flag } from './entities/flag.entity';
import { FlagsService } from './flags.service';

@Resolver(() => Flag)
@UseGuards(JwtAuthGuard)
export class FlagsResolver {
  constructor(private readonly flagsService: FlagsService) {}

  @Mutation(() => Flag, { name: 'flagContent' })
  async createFlag(
    @Args('createFlagInput') createFlagInput: CreateFlagInput,
    @CurrentUser() user: User,
  ): Promise<Flag> {
    return this.flagsService.create(createFlagInput, user.id);
  }
}
