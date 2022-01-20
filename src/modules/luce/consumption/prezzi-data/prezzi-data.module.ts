import { CacheModule, Module } from '@nestjs/common';
import { PrezziDataService } from './prezzi-data.service';
import { PrezziDataController } from './prezzi-data.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { danieleRiepilogoBollette } from '../../../entities/daniele_riepilogo_bollette';

@Module({
    imports: [
        CacheModule.register({
            ttl: 900,
            max: 5,
        }),
        TypeOrmModule.forFeature([danieleRiepilogoBollette]),
    ],
    controllers: [PrezziDataController],
    providers: [PrezziDataService],
    exports: [PrezziDataService],
})
export class PrezziDataModule {}
