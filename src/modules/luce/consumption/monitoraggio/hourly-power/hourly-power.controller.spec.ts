import { Test, TestingModule } from '@nestjs/testing';
import { HourlyPowerController } from './hourly-power.controller';
import { HourlyPowerService } from './hourly-power.service';

describe('HourlyPowerController', () => {
  let controller: HourlyPowerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HourlyPowerController],
      providers: [HourlyPowerService],
    }).compile();

    controller = module.get<HourlyPowerController>(HourlyPowerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
