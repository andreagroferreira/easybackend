import { Test, TestingModule } from '@nestjs/testing';
import { MetersListController } from './meters-list.controller';
import { MetersListService } from './meters-list.service';

describe('MetersListController', () => {
  let controller: MetersListController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MetersListController],
      providers: [MetersListService],
    }).compile();

    controller = module.get<MetersListController>(MetersListController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
