import { Test, TestingModule } from '@nestjs/testing';
import { LettureDataService } from './letture-data.service';

describe('LettureDataService', () => {
  let service: LettureDataService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LettureDataService],
    }).compile();

    service = module.get<LettureDataService>(LettureDataService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
