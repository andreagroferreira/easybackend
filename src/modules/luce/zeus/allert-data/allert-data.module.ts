import { CacheModule, Module } from '@nestjs/common';
import { AllertDataService } from './allert-data.service';
import { AllertDataController } from './allert-data.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NetsuiteSalesorders } from '../../../entities/netsuite_salesorders';
import { PaoloStoricoAllerte } from '../../../entities/paolo_storico_allerte';
import { NetsuiteClientsAll } from '../../../entities/netsuite_clients_all';

@Module({
    imports: [
        CacheModule.register({
            ttl: 900,
            max: 5,
        }),
        TypeOrmModule.forFeature([NetsuiteClientsAll, NetsuiteSalesorders, PaoloStoricoAllerte]),
    ],
    controllers: [AllertDataController],
    providers: [AllertDataService],
})
export class AllertDataModule {}
