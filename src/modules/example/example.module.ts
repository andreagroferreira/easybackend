import { CacheModule, Module } from '@nestjs/common';
import { ExampleController } from './example.controller';
import { ExampleService } from './example.service';
import { PodsModule } from '../luce/pods/pods.module';
import { LettureDataModule } from '../luce/consumption/letture-data/letture-data.module';
import { PrezziDataModule } from '../luce/consumption/prezzi-data/prezzi-data.module';
import { BolleteDataModule } from '../luce/transactions/bollete-data/bollete-data.module';
import { ContatoriDataModule } from '../luce/transactions/contatori-data/contatori-data.module';
import { EnergiaVerdeDataModule } from '../luce/transactions/energia-verde-data/energia-verde-data.module';
import { FattureDataModule } from '../luce/transactions/fatture-data/fatture-data.module';

@Module({
    imports: [
        CacheModule.register({
            // Define ttl of cache and max number of item for this module only
            ttl: 3600,
            max: 50,
        }),
        PodsModule,
        LettureDataModule,
        PrezziDataModule,
        BolleteDataModule,
        ContatoriDataModule,
        EnergiaVerdeDataModule,
        FattureDataModule,
    ],
    providers: [ExampleService],
    controllers: [ExampleController],
})
export class ExampleModule {}
