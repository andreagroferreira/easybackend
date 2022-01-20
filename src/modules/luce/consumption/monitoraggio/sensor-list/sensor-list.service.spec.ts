import { Test, TestingModule } from '@nestjs/testing';
import { SensorListService } from './sensor-list.service';

describe('SensorListService', () => {
  let service: SensorListService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SensorListService],
    }).compile();

    service = module.get<SensorListService>(SensorListService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
