import { Test, TestingModule } from '@nestjs/testing';
import { ReportDataService } from './report-data.service';

describe('ReportDataService', () => {
  let service: ReportDataService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReportDataService],
    }).compile();

    service = module.get<ReportDataService>(ReportDataService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
