import { CacheModule, Module } from '@nestjs/common';
import { VisiteDataService } from './visite-data.service';
import { VisiteDataController } from './visite-data.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NetsuiteClientsAll } from '../../../entities/netsuite_clients_all';
import { WebappPdfsVisite } from '../../../entities/webapp_pdfs_visite';

@Module({
    imports: [
        CacheModule.register({
            ttl: 900,
            max: 5,
        }),
        TypeOrmModule.forFeature([NetsuiteClientsAll, WebappPdfsVisite]),
    ],
    controllers: [VisiteDataController],
    providers: [VisiteDataService],
})
export class VisiteDataModule {}
