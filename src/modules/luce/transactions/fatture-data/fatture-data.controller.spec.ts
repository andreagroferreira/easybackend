import { Test, TestingModule } from '@nestjs/testing';
import { FattureDataController } from './fatture-data.controller';
import { FattureDataService } from './fatture-data.service';

describe('FattureDataController', () => {
  let controller: FattureDataController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FattureDataController],
      providers: [FattureDataService],
    }).compile();

    controller = module.get<FattureDataController>(FattureDataController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
