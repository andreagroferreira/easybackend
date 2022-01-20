import { INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

export const setupSwagger = (app: INestApplication) => {
    const options = new DocumentBuilder()
        .setTitle(`${process.env.SWAGGER_API_NAME}`)
        .setDescription(`${process.env.SWAGGER_API_DESCRIPTION}`)
        .setVersion(`${process.env.SWAGGER_API_CURRENT_VERSION}`)
        // .addBearerAuth( { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' }, SWAGGER_API_AUTH_LOCATION)
        .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup(`${process.env.SWAGGER_API_ROOT}`, app, document);
};
