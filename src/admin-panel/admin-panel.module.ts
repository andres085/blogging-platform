import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { AdminPanelResolver } from './admin-panel.resolver';
import { AdminPanelService } from './admin-panel.service';

@Module({
  providers: [AdminPanelResolver, AdminPanelService],
  imports: [UsersModule],
})
export class AdminPanelModule {}
