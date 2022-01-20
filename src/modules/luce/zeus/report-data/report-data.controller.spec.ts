import { Test, TestingModule } from '@nestjs/testing';
import { ReportDataController } from './report-data.controller';
import { ReportDataService } from './report-data.service';

describe('ReportDataController', () => {
  let controller: ReportDataController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReportDataController],
      providers: [ReportDataService],
    }).compile();

    controller = module.get<ReportDataController>(ReportDataController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
