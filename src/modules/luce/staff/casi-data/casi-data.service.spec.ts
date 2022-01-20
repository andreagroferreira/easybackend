import { Test, TestingModule } from '@nestjs/testing';
import { CasiDataService } from './casi-data.service';

describe('CasiDataService', () => {
  let service: CasiDataService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CasiDataService],
    }).compile();

    service = module.get<CasiDataService>(CasiDataService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
