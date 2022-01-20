import { CacheModule, Module } from '@nestjs/common';
import { ContattiDataService } from './contatti-data.service';
import { ContattiDataController } from './contatti-data.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NetsuiteClientsAll } from '../../../entities/netsuite_clients_all';
import { NetsuiteSalesorders } from '../../../entities/netsuite_salesorders';
import { NetsuiteContacts } from '../../../entities/netsuite_contacts';

@Module({
    imports: [
        CacheModule.register({
            ttl: 900,
            max: 5,
        }),
        TypeOrmModule.forFeature([NetsuiteClientsAll, NetsuiteSalesorders, NetsuiteContacts]),
    ],
    controllers: [ContattiDataController],
    providers: [ContattiDataService],
})
export class ContattiDataModule {}
