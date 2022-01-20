import { Test, TestingModule } from '@nestjs/testing';
import { VisiteDataService } from './visite-data.service';

describe('VisiteDataService', () => {
  let service: VisiteDataService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VisiteDataService],
    }).compile();

    service = module.get<VisiteDataService>(VisiteDataService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
