import { Test, TestingModule } from '@nestjs/testing';
import { ContatoriDataController } from './contatori-data.controller';
import { ContatoriDataService } from './contatori-data.service';

describe('ContatoriDataController', () => {
  let controller: ContatoriDataController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ContatoriDataController],
      providers: [ContatoriDataService],
    }).compile();

    controller = module.get<ContatoriDataController>(ContatoriDataController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
