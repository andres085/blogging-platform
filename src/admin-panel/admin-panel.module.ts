import { Module } from '@nestjs/common';
import { BlogsModule } from '../blogs/blogs.module';
import { FlagsModule } from '../flags/flags.module';
import { UsersModule } from '../users/users.module';
import { AdminPanelResolver } from './admin-panel.resolver';
import { AdminPanelService } from './admin-panel.service';

@Module({
  providers: [AdminPanelResolver, AdminPanelService],
  imports: [UsersModule, BlogsModule, FlagsModule],
})
export class AdminPanelModule {}
