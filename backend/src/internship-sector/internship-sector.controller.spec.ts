import { Test, TestingModule } from '@nestjs/testing';
import { InternshipSectorController } from './internship-sector.controller';

describe('InternshipSectorController', () => {
  let controller: InternshipSectorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InternshipSectorController],
    }).compile();

    controller = module.get<InternshipSectorController>(InternshipSectorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
