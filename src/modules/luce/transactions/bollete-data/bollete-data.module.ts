import { CacheModule, Module } from '@nestjs/common';
import { BolleteDataService } from './bollete-data.service';
import { BolleteDataController } from './bollete-data.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { danieleRiepilogoBollette } from '../../../entities/daniele_riepilogo_bollette';
import { WebappPdfsClients } from '../../../entities/webapp_pdfs_clients';

@Module({
    imports: [
        CacheModule.register({
            ttl: 900,
            max: 5,
        }),
        TypeOrmModule.forFeature([danieleRiepilogoBollette, WebappPdfsClients]),
    ],
    controllers: [BolleteDataController],
    providers: [BolleteDataService],
    exports: [BolleteDataService],
})
export class BolleteDataModule {}
