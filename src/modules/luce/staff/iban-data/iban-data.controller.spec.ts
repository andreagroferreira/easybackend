import { Test, TestingModule } from '@nestjs/testing';
import { IbanDataController } from './iban-data.controller';
import { IbanDataService } from './iban-data.service';

describe('IbanDataController', () => {
  let controller: IbanDataController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IbanDataController],
      providers: [IbanDataService],
    }).compile();

    controller = module.get<IbanDataController>(IbanDataController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
