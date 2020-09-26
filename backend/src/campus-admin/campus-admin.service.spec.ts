import { Test, TestingModule } from '@nestjs/testing';
import { CampusAdminService } from './campus-admin.service';

describe('CampusAdminService', () => {
  let service: CampusAdminService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CampusAdminService],
    }).compile();

    service = module.get<CampusAdminService>(CampusAdminService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
