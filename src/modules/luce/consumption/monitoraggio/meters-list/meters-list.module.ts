import { CacheModule, Module } from '@nestjs/common';
import { MetersListService } from './meters-list.service';
import { MetersListController } from './meters-list.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NetsuiteSalesorders } from '../../../../entities/netsuite_salesorders';
import { CarloTabTotRaggruppati } from '../../../../entities/carlo_tab_tot_raggruppati';

@Module({
    imports: [
        CacheModule.register({
            ttl: 900,
            max: 5,
        }),
        TypeOrmModule.forFeature([NetsuiteSalesorders, CarloTabTotRaggruppati]),
    ],
    controllers: [MetersListController],
    providers: [MetersListService],
})
export class MetersListModule {}
