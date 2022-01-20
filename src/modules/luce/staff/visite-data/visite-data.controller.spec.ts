import { Test, TestingModule } from '@nestjs/testing';
import { VisiteDataController } from './visite-data.controller';
import { VisiteDataService } from './visite-data.service';

describe('VisiteDataController', () => {
  let controller: VisiteDataController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VisiteDataController],
      providers: [VisiteDataService],
    }).compile();

    controller = module.get<VisiteDataController>(VisiteDataController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
