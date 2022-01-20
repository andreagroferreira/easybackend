import { Test, TestingModule } from '@nestjs/testing';
import { AllertDataController } from './allert-data.controller';
import { AllertDataService } from './allert-data.service';

describe('AllertDataController', () => {
  let controller: AllertDataController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AllertDataController],
      providers: [AllertDataService],
    }).compile();

    controller = module.get<AllertDataController>(AllertDataController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
