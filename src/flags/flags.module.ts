import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Flag } from './entities/flag.entity';
import { FlagsResolver } from './flags.resolver';
import { FlagsService } from './flags.service';

@Module({
  providers: [FlagsResolver, FlagsService],
  imports: [TypeOrmModule.forFeature([Flag])],
  exports: [FlagsService, TypeOrmModule],
})
export class FlagsModule {}
