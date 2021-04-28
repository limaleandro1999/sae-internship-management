import { Test, TestingModule } from '@nestjs/testing';
import { InternsController } from './interns.controller';

describe('InternsController', () => {
  let controller: InternsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InternsController],
    }).compile();

    controller = module.get<InternsController>(InternsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
