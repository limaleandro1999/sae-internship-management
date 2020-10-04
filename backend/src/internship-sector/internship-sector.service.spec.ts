import { Test, TestingModule } from '@nestjs/testing';
import { InternshipSectorService } from './internship-sector.service';

describe('InternshipSectorService', () => {
  let service: InternshipSectorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InternshipSectorService],
    }).compile();

    service = module.get<InternshipSectorService>(InternshipSectorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
