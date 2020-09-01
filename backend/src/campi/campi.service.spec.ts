import { Test, TestingModule } from '@nestjs/testing';
import { CampiService } from './campi.service';

describe('CampiService', () => {
  let service: CampiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CampiService],
    }).compile();

    service = module.get<CampiService>(CampiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
