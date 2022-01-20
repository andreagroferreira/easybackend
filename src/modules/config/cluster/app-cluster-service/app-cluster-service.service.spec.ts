import { Test, TestingModule } from '@nestjs/testing';
import { AppClusterServiceService } from './app-cluster-service.service';

describe('AppClusterServiceService', () => {
  let service: AppClusterServiceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppClusterServiceService],
    }).compile();

    service = module.get<AppClusterServiceService>(AppClusterServiceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
