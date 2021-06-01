import { Test, TestingModule } from '@nestjs/testing';
import { InternshipProcessesController } from './internship-processes.controller';

describe('InternshipProcessesController', () => {
  let controller: InternshipProcessesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InternshipProcessesController],
    }).compile();

    controller = module.get<InternshipProcessesController>(
      InternshipProcessesController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
