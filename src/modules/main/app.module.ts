import { ConfigService } from '../config/config.service';
import { Module } from '@nestjs/common';
import { BugsnagModule } from '@nkaurelien/nest-bugsnag';
import BugsnagPluginExpress from '@bugsnag/plugin-express';
import { ConfigModule } from '../config/config.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Auth0Module } from '../auth0/auth0.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { ScheduleModule } from '@nestjs/schedule';
import { ExampleModule } from '../example/example.module';
import {
    AcceptLanguageResolver,
    CookieResolver,
    HeaderResolver,
    I18nJsonParser,
    I18nModule,
    QueryResolver,
} from 'nestjs-i18n';
import * as path from 'path';
import { DatabaseModule } from '../database/database.module';
import { PodsModule } from '../luce/pods/pods.module';
import { PrezziDataModule } from '../luce/consumption/prezzi-data/prezzi-data.module';
import { LettureDataModule } from '../luce/consumption/letture-data/letture-data.module';
import { ContatoriDataModule } from '../luce/transactions/contatori-data/contatori-data.module';
import { CasiDataModule } from '../luce/staff/casi-data/casi-data.module';
import { FattureDataModule } from '../luce/transactions/fatture-data/fatture-data.module';
import { EnergiaVerdeDataModule } from '../luce/transactions/energia-verde-data/energia-verde-data.module';
import { BolleteDataModule } from '../luce/transactions/bollete-data/bollete-data.module';
import { ReportDataModule } from '../luce/zeus/report-data/report-data.module';
import { VisiteDataModule } from '../luce/staff/visite-data/visite-data.module';
import { SensorListModule } from '../luce/consumption/monitoraggio/sensor-list/sensor-list.module';
import { MetersListModule } from '../luce/consumption/monitoraggio/meters-list/meters-list.module';
import { AllertDataModule } from '../luce/zeus/allert-data/allert-data.module';
import { HourlyPowerModule } from '../luce/consumption/monitoraggio/hourly-power/hourly-power.module';
import { ContattiDataModule } from '../luce/staff/contatti-data/contatti-data.module';
import { IbanDataModule } from '../luce/staff/iban-data/iban-data.module';

@Module({
    imports: [
        // Auth0 Module
        Auth0Module,
        ConfigModule,
        // Example Module Load
        ExampleModule,
        DatabaseModule,
        // Module for Translations
        I18nModule.forRoot({
            fallbackLanguage: 'en',
            parser: I18nJsonParser,
            parserOptions: {
                path: path.join(process.cwd(), '/src/i18n/'),
                // add this to enable live translations
                watch: true,
            },
            resolvers: [
                { use: QueryResolver, options: ['lang', 'locale', 'l'] },
                new HeaderResolver(['x-custom-lang']),
                AcceptLanguageResolver,
                new CookieResolver(['lang', 'locale', 'l']),
            ],
        }),
        // Module for Cron
        ScheduleModule.forRoot(),
        // Module for Bugsnag
        BugsnagModule.forRoot({
            apiKey: `${process.env.BUGSNAG_KEY}`,
            plugins: [BugsnagPluginExpress],
        }),
        // Module to send emails
        MailerModule.forRoot({
            transport: {
                host: 'smtp.office365.com',
                port: 587,
                secure: false,
                auth: {
                    user: 'smtp@eviso.it',
                    pass: process.env.EMAIL_PASS,
                },
                tls: {
                    rejectUnauthorized: false,
                },
            },
            defaults: {
                from: '"nest-modules" <modules@nestjs.com>',
            },
            template: {
                dir: process.cwd() + '/templates/',
                adapter: new HandlebarsAdapter(),
                options: {
                    strict: true,
                },
            },
        }),
        PodsModule,
        PrezziDataModule,
        LettureDataModule,
        ContatoriDataModule,
        CasiDataModule,
        FattureDataModule,
        EnergiaVerdeDataModule,
        BolleteDataModule,
        ReportDataModule,
        VisiteDataModule,
        SensorListModule,
        MetersListModule,
        AllertDataModule,
        HourlyPowerModule,
        ContattiDataModule,
        IbanDataModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule /* implements NestModule */ {
    static port: string | number;
    static isDev: boolean;

    constructor(private readonly config: ConfigService) {
        AppModule.port = config.get('API_PORT');
        AppModule.isDev = config.isDev;
    }

    // DOC: https://docs.nestjs.com/middleware
    // configure(consumer: MiddlewareConsumer) {
    //   consumer
    //     .apply(loggerMiddleware)
    //     .forRoutes({ path: '/', method: RequestMethod.ALL });
    // }
}
