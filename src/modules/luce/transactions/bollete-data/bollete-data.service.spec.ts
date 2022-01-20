import { Test, TestingModule } from '@nestjs/testing';
import { BolleteDataService } from './bollete-data.service';

describe('BolleteDataService', () => {
  let service: BolleteDataService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BolleteDataService],
    }).compile();

    service = module.get<BolleteDataService>(BolleteDataService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
