import { Test, TestingModule } from '@nestjs/testing';
import { IbanDataService } from './iban-data.service';

describe('IbanDataService', () => {
  let service: IbanDataService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IbanDataService],
    }).compile();

    service = module.get<IbanDataService>(IbanDataService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
