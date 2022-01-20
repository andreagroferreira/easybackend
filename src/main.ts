import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { getConnection } from 'typeorm';
import * as helmet from 'helmet';

import { setupSwagger } from './swagger';
import { AppModule } from './modules/main/app.module';
import { BugsnagService } from '@nkaurelien/nest-bugsnag';
import { AppClusterServiceService } from './modules/config/cluster/app-cluster-service/app-cluster-service.service';
declare const module: any;
require('newrelic');
async function bootstrap() {
    const app = await NestFactory.create(AppModule, { cors: true });
    const logger = new Logger('Main', true);
    const globalPrefix = '/api';

    setupSwagger(app);

    app.enableCors();
    app.useGlobalPipes(new ValidationPipe());
    app.setGlobalPrefix(globalPrefix);
    app.use(helmet());
    const port = process.env.PORT || AppModule.port;
    // app.use(loggerMiddleware);
    app.get(BugsnagService).handleAnyErrors(app);

    await app.listen(port);

    // for Hot Module Reload
    if (module.hot) {
        const connection = getConnection();
        if (connection.isConnected) {
            await connection.close();
        }
        module.hot.accept();
        module.hot.dispose(() => app.close());
    }

    // Log current url of app and documentation
    let baseUrl = app.getHttpServer().address() ? app.getHttpServer().address().address : '::';
    if (baseUrl === '0.0.0.0' || baseUrl === '::') {
        baseUrl = 'localhost';
    }

    const url = `http://${baseUrl}:${port}${globalPrefix}`;
    logger.log(`Listening to ${url}`);
    if (AppModule.isDev) {
        logger.log(`API Documentation available at ${url}/docs`);
    }
}

AppClusterServiceService.register(4, bootstrap);
