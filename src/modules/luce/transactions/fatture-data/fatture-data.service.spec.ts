import { Test, TestingModule } from '@nestjs/testing';
import { FattureDataService } from './fatture-data.service';

describe('FattureDataService', () => {
  let service: FattureDataService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FattureDataService],
    }).compile();

    service = module.get<FattureDataService>(FattureDataService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
