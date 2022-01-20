import { Test, TestingModule } from '@nestjs/testing';
import { EnergiaVerdeDataController } from './energia-verde-data.controller';
import { EnergiaVerdeDataService } from './energia-verde-data.service';

describe('EnergiaVerdeDataController', () => {
  let controller: EnergiaVerdeDataController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EnergiaVerdeDataController],
      providers: [EnergiaVerdeDataService],
    }).compile();

    controller = module.get<EnergiaVerdeDataController>(EnergiaVerdeDataController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
