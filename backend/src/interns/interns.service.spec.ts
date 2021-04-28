import { Test, TestingModule } from '@nestjs/testing';
import { InternsService } from './interns.service';

describe('InternsService', () => {
  let service: InternsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InternsService],
    }).compile();

    service = module.get<InternsService>(InternsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
