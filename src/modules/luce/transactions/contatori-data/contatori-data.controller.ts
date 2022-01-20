import { Controller, Get, Param, BadRequestException } from '@nestjs/common';
import { ContatoriDataService } from './contatori-data.service';
import { BugsnagService } from '@nkaurelien/nest-bugsnag';

@Controller('contatori-data')
export class ContatoriDataController {
    constructor(private readonly contatoriDataService: ContatoriDataService, private readonly logger: BugsnagService) {}

    @Get(':podId/:clientId')
    getContatoriData(@Param('podId') podId: string, @Param('clientId') clientId: string) {
        try {
            return this.contatoriDataService.getContatoriData(podId, clientId, 'staff', 'staff');
        } catch (error) {
            this.logger.instance.notify(error, function (event) {
                event.addMetadata('luce-transactions', {
                    endpoint: 'contatori-data@getContatoriData',
                    method: 'GET',
                    param: { podId, clientId },
                });
            });
            throw new BadRequestException(error);
        }
    }
}
