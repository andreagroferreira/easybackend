import { Test, TestingModule } from '@nestjs/testing';
import { SensorListController } from './sensor-list.controller';
import { SensorListService } from './sensor-list.service';

describe('SensorListController', () => {
  let controller: SensorListController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SensorListController],
      providers: [SensorListService],
    }).compile();

    controller = module.get<SensorListController>(SensorListController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
