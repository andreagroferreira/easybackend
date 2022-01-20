import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';

import { ConfigModule } from '../config/config.module';
import { ConfigService } from '../config/config.service';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (config: ConfigService) =>
                ({
                    type: config.databaseType,
                    host: config.databaseHost,
                    port: config.databasePort,
                    database: config.databaseName,
                    username: config.databaseUsername,
                    password: config.databasePassword,
                    entities: ['src/modules/entities/*{.ts,.js}'],
                    // importing entities directly because Webpack + glob path pattern + ts file = crash
                    // https://github.com/nestjs/nest/issues/711
                    synchronize: false,
                    logging: false,
                    useNewUrlParser: true,
                    ssl: false,
                } as TypeOrmModuleOptions),
        }),
    ],
})
export class DatabaseModule {}
