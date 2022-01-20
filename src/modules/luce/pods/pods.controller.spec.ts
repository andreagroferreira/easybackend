import { Test, TestingModule } from '@nestjs/testing';
import { PodsController } from './pods.controller';
import { PodsService } from './pods.service';

describe('PodsController', () => {
    let controller: PodsController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [PodsController],
            providers: [PodsService],
        }).compile();

        controller = module.get<PodsController>(PodsController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
