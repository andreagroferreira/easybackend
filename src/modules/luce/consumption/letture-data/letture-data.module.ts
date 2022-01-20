import { CacheModule, Module } from '@nestjs/common';
import { LettureDataService } from './letture-data.service';
import { LettureDataController } from './letture-data.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DanieleLettureDafour } from '../../../entities/daniele_letture_dafour';
import { NetsuiteSalesorders } from '../../../entities/netsuite_salesorders';

@Module({
    imports: [
        CacheModule.register({
            ttl: 900,
            max: 5,
        }),
        TypeOrmModule.forFeature([DanieleLettureDafour, NetsuiteSalesorders]),
    ],
    controllers: [LettureDataController],
    providers: [LettureDataService],
    exports: [LettureDataService],
})
export class LettureDataModule {}
