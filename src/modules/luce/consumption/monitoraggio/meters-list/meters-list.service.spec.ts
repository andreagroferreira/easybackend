import { Test, TestingModule } from '@nestjs/testing';
import { MetersListService } from './meters-list.service';

describe('MetersListService', () => {
  let service: MetersListService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MetersListService],
    }).compile();

    service = module.get<MetersListService>(MetersListService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
