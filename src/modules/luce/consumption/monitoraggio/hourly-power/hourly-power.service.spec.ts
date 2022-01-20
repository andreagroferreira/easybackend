import { Test, TestingModule } from '@nestjs/testing';
import { HourlyPowerService } from './hourly-power.service';

describe('HourlyPowerService', () => {
  let service: HourlyPowerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HourlyPowerService],
    }).compile();

    service = module.get<HourlyPowerService>(HourlyPowerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
