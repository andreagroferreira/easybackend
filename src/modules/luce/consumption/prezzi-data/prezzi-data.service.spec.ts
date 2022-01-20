import { Test, TestingModule } from '@nestjs/testing';
import { PrezziDataService } from './prezzi-data.service';

describe('PrezziDataService', () => {
  let service: PrezziDataService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrezziDataService],
    }).compile();

    service = module.get<PrezziDataService>(PrezziDataService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
