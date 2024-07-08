import { UseGuards } from '@nestjs/common';
import { Mutation, Resolver } from '@nestjs/graphql';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { SeedService } from './seed.service';

@Resolver()
@UseGuards(JwtAuthGuard)
export class SeedResolver {
  constructor(private readonly seedService: SeedService) {}

  @Mutation(() => Boolean, { name: 'executeSeed' })
  async executeSeed(): Promise<boolean> {
    return this.seedService.execute();
  }
}
