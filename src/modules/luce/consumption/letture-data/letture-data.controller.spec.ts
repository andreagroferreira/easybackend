import { Test, TestingModule } from '@nestjs/testing';
import { LettureDataController } from './letture-data.controller';
import { LettureDataService } from './letture-data.service';

describe('LettureDataController', () => {
  let controller: LettureDataController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LettureDataController],
      providers: [LettureDataService],
    }).compile();

    controller = module.get<LettureDataController>(LettureDataController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
