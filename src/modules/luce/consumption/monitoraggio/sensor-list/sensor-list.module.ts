import { CacheModule, Module } from '@nestjs/common';
import { SensorListService } from './sensor-list.service';
import { SensorListController } from './sensor-list.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarloTabTotRaggruppati } from '../../../../entities/carlo_tab_tot_raggruppati';

@Module({
    imports: [
        CacheModule.register({
            ttl: 900,
            max: 5,
        }),
        TypeOrmModule.forFeature([CarloTabTotRaggruppati]),
    ],
    controllers: [SensorListController],
    providers: [SensorListService],
})
export class SensorListModule {}
