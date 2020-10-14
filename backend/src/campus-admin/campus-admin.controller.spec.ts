import { Test, TestingModule } from '@nestjs/testing';
import { CampusAdminController } from './campus-admin.controller';

describe('CampusAdminController', () => {
  let controller: CampusAdminController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CampusAdminController],
    }).compile();

    controller = module.get<CampusAdminController>(CampusAdminController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
