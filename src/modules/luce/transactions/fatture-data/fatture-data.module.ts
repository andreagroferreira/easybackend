import { CacheModule, Module } from '@nestjs/common';
import { FattureDataService } from './fatture-data.service';
import { FattureDataController } from './fatture-data.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NetsuiteClientsAll } from '../../../entities/netsuite_clients_all';
import { NetsuiteSalesorders } from '../../../entities/netsuite_salesorders';
import { NetsuiteInvoices } from '../../../entities/netsuite_invoices';

@Module({
    imports: [
        CacheModule.register({
            ttl: 900,
            max: 5,
        }),
        TypeOrmModule.forFeature([NetsuiteClientsAll, NetsuiteSalesorders, NetsuiteInvoices]),
    ],
    controllers: [FattureDataController],
    providers: [FattureDataService],
    exports: [FattureDataService],
})
export class FattureDataModule {}
