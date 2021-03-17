import { Test, TestingModule } from '@nestjs/testing';
import { InternshipAdvisorsService } from './internship-advisors.service';

describe('InternshipAdvisorsService', () => {
  let service: InternshipAdvisorsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InternshipAdvisorsService],
    }).compile();

    service = module.get<InternshipAdvisorsService>(InternshipAdvisorsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
