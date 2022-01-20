import { CacheModule, Module } from '@nestjs/common';
import { EnergiaVerdeDataService } from './energia-verde-data.service';
import { EnergiaVerdeDataController } from './energia-verde-data.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

import { NetsuiteSalesorders } from '../../../entities/netsuite_salesorders';
import { WebappPdfsEnergiaVerde } from '../../../entities/webapp_pdfs_energia_verde_2019';

@Module({
    imports: [
        CacheModule.register({
            ttl: 900,
            max: 5,
        }),
        TypeOrmModule.forFeature([NetsuiteSalesorders, WebappPdfsEnergiaVerde]),
    ],
    controllers: [EnergiaVerdeDataController],
    providers: [EnergiaVerdeDataService],
    exports: [EnergiaVerdeDataService],
})
export class EnergiaVerdeDataModule {}
