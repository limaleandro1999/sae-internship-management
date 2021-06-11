import { Test, TestingModule } from '@nestjs/testing';
import { InternshipProcessesService } from './internship-processes.service';

describe('InternshipProcessesService', () => {
  let service: InternshipProcessesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InternshipProcessesService],
    }).compile();

    service = module.get<InternshipProcessesService>(
      InternshipProcessesService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
