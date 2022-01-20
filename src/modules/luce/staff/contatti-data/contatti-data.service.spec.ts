import { Test, TestingModule } from '@nestjs/testing';
import { ContattiDataService } from './contatti-data.service';

describe('ContattiDataService', () => {
  let service: ContattiDataService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ContattiDataService],
    }).compile();

    service = module.get<ContattiDataService>(ContattiDataService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
