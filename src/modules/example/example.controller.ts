import {
    CacheInterceptor,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { ExampleService } from './example.service';
import { BugsnagService } from '@nkaurelien/nest-bugsnag';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { I18n, I18nContext } from 'nestjs-i18n';

@Controller('example')
@ApiTags('Example')
export class ExampleController {
    constructor(private readonly exampleService: ExampleService, private readonly logger: BugsnagService) {}

    @Get('example-endpoint')
    @UseInterceptors(CacheInterceptor)
    @UseGuards(AuthGuard('jwt'))
    @ApiResponse({ status: HttpStatus.ACCEPTED, description: 'Return Data' })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
    @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
    @HttpCode(HttpStatus.OK)
    getExampleData() {
        try {
            return this.exampleService.exampleMethod();
        } catch (error) {
            this.logger.instance.notify(error);
        }
    }

    @Get('')
    async sample(@I18n() i18n: I18nContext) {
        let translation = await i18n.translate('example.WELCOME');
        let translation2 = await i18n.translate('example.BYE');
        return { translation: translation, translation2: translation2 };
    }

    @Get('test/:id')
    testBoot(@Param('id') id: string) {
        return this.exampleService.bootExample(id);
    }
}
