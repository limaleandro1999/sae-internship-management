import { Test, TestingModule } from '@nestjs/testing';
import { CampiController } from './campi.controller';

describe('CampiController', () => {
  let controller: CampiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CampiController],
    }).compile();

    controller = module.get<CampiController>(CampiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
