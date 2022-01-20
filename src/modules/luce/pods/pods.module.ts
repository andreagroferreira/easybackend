import { CacheModule, Module } from '@nestjs/common';
import { PodsService } from './pods.service';
import { PodsController } from './pods.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NetsuiteClientsAll } from '../../entities/netsuite_clients_all';

@Module({
    imports: [
        CacheModule.register({
            ttl: 900,
            max: 5,
        }),
        TypeOrmModule.forFeature([NetsuiteClientsAll]),
    ],
    controllers: [PodsController],
    providers: [PodsService],
    exports: [PodsService],
})
export class PodsModule {}
