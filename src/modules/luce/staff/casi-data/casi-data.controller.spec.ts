import { Test, TestingModule } from '@nestjs/testing';
import { CasiDataController } from './casi-data.controller';
import { CasiDataService } from './casi-data.service';

describe('CasiDataController', () => {
  let controller: CasiDataController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CasiDataController],
      providers: [CasiDataService],
    }).compile();

    controller = module.get<CasiDataController>(CasiDataController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
