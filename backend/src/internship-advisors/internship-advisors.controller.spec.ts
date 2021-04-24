import { Test, TestingModule } from '@nestjs/testing';
import { InternshipAdvisorsController } from './internship-advisors.controller';

describe('InternshipAdvisorsController', () => {
  let controller: InternshipAdvisorsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InternshipAdvisorsController],
    }).compile();

    controller = module.get<InternshipAdvisorsController>(
      InternshipAdvisorsController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
