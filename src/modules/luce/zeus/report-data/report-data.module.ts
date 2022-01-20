import { CacheModule, Module } from '@nestjs/common';
import { ReportDataService } from './report-data.service';
import { ReportDataController } from './report-data.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NetsuiteSalesorders } from '../../../entities/netsuite_salesorders';
import { WebappPdfsClients } from '../../../entities/webapp_pdfs_clients';

@Module({
    imports: [
        CacheModule.register({
            ttl: 900,
            max: 5,
        }),
        TypeOrmModule.forFeature([NetsuiteSalesorders, WebappPdfsClients]),
    ],
    controllers: [ReportDataController],
    providers: [ReportDataService],
})
export class ReportDataModule {}
