import { Test, TestingModule } from '@nestjs/testing';
import { EnergiaVerdeDataService } from './energia-verde-data.service';

describe('EnergiaVerdeDataService', () => {
  let service: EnergiaVerdeDataService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EnergiaVerdeDataService],
    }).compile();

    service = module.get<EnergiaVerdeDataService>(EnergiaVerdeDataService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
