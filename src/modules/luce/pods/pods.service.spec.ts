import { Test, TestingModule } from '@nestjs/testing';
import { PodsService } from './pods.service';

describe('PodsService', () => {
    let service: PodsService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [PodsService],
        }).compile();

        service = module.get<PodsService>(PodsService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
