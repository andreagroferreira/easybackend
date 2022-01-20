import { CacheModule, Module } from '@nestjs/common';
import { ContatoriDataService } from './contatori-data.service';
import { ContatoriDataController } from './contatori-data.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NetsuiteClientsAll } from '../../../entities/netsuite_clients_all';
import { NetsuiteSalesorders } from '../../../entities/netsuite_salesorders';

@Module({
    imports: [
        CacheModule.register({
            ttl: 900,
            max: 5,
        }),
        TypeOrmModule.forFeature([NetsuiteClientsAll, NetsuiteSalesorders]),
    ],
    controllers: [ContatoriDataController],
    providers: [ContatoriDataService],
    exports: [ContatoriDataService],
})
export class ContatoriDataModule {}
