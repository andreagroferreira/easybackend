import { CacheModule, Module } from '@nestjs/common';
import { IbanDataService } from './iban-data.service';
import { IbanDataController } from './iban-data.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NetsuiteIban } from '../../../entities/netsuite_iban';

@Module({
    imports: [
        CacheModule.register({
            ttl: 900,
            max: 5,
        }),
        TypeOrmModule.forFeature([NetsuiteIban]),
    ],
    controllers: [IbanDataController],
    providers: [IbanDataService],
})
export class IbanDataModule {}
