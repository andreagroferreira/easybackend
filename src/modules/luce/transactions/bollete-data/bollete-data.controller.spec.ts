import { Test, TestingModule } from '@nestjs/testing';
import { BolleteDataController } from './bollete-data.controller';
import { BolleteDataService } from './bollete-data.service';

describe('BolleteDataController', () => {
  let controller: BolleteDataController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BolleteDataController],
      providers: [BolleteDataService],
    }).compile();

    controller = module.get<BolleteDataController>(BolleteDataController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
