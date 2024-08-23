import { Test, TestingModule } from '@nestjs/testing';
import { AdminPanelResolver } from './admin-panel.resolver';
import { AdminPanelService } from './admin-panel.service';

describe('AdminPanelResolver', () => {
  let resolver: AdminPanelResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AdminPanelResolver, AdminPanelService],
    }).compile();

    resolver = module.get<AdminPanelResolver>(AdminPanelResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
