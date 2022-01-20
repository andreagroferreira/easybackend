import { Test, TestingModule } from '@nestjs/testing';
import { ContatoriDataService } from './contatori-data.service';

describe('ContatoriDataService', () => {
  let service: ContatoriDataService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ContatoriDataService],
    }).compile();

    service = module.get<ContatoriDataService>(ContatoriDataService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
