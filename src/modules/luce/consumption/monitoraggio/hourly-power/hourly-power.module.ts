import { CacheModule, Module } from '@nestjs/common';
import { HourlyPowerService } from './hourly-power.service';
import { HourlyPowerController } from './hourly-power.controller';
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
    controllers: [HourlyPowerController],
    providers: [HourlyPowerService],
})
export class HourlyPowerModule {}
