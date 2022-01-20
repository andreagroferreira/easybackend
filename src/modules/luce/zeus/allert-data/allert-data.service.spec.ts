import { Test, TestingModule } from '@nestjs/testing';
import { AllertDataService } from './allert-data.service';

describe('AllertDataService', () => {
  let service: AllertDataService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AllertDataService],
    }).compile();

    service = module.get<AllertDataService>(AllertDataService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
