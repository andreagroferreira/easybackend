import { Test, TestingModule } from '@nestjs/testing';
import { PrezziDataController } from './prezzi-data.controller';
import { PrezziDataService } from './prezzi-data.service';

describe('PrezziDataController', () => {
  let controller: PrezziDataController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PrezziDataController],
      providers: [PrezziDataService],
    }).compile();

    controller = module.get<PrezziDataController>(PrezziDataController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
