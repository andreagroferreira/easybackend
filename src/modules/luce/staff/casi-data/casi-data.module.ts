import { CacheModule, Module } from '@nestjs/common';
import { CasiDataService } from './casi-data.service';
import { CasiDataController } from './casi-data.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NetsuiteSalesorders } from '../../../entities/netsuite_salesorders';
import { NetsuiteCases } from '../../../entities/netsuite_cases';

@Module({
    imports: [
        CacheModule.register({
            ttl: 900,
            max: 5,
        }),
        TypeOrmModule.forFeature([NetsuiteSalesorders, NetsuiteCases]),
    ],
    controllers: [CasiDataController],
    providers: [CasiDataService],
})
export class CasiDataModule {}
