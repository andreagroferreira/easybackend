import { Test, TestingModule } from '@nestjs/testing';
import { ContattiDataController } from './contatti-data.controller';
import { ContattiDataService } from './contatti-data.service';

describe('ContattiDataController', () => {
  let controller: ContattiDataController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ContattiDataController],
      providers: [ContattiDataService],
    }).compile();

    controller = module.get<ContattiDataController>(ContattiDataController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
