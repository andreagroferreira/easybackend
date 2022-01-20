import { Module } from '@nestjs/common';

import { ConfigService } from './config.service';
import { AppClusterServiceService } from './cluster/app-cluster-service/app-cluster-service.service';

@Module({
    providers: [
        {
            provide: ConfigService,
            useValue: new ConfigService(`.env.${process.env.NODE_ENV}`),
        },
        AppClusterServiceService,
    ],
    exports: [ConfigService],
})
export class ConfigModule {}
