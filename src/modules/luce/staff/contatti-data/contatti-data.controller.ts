import { Controller, Get, Param, BadRequestException } from '@nestjs/common';
import { ContattiDataService } from './contatti-data.service';
import { BugsnagService } from '@nkaurelien/nest-bugsnag';

@Controller('contatti-data')
export class ContattiDataController {
    constructor(private readonly contattiDataService: ContattiDataService, private readonly logger: BugsnagService) {}

    @Get(':podId/:clientId')
    getContattiData(@Param('podId') podId: string, @Param('clientId') clientId: string) {
        try {
            return this.contattiDataService.getContattiData(podId, clientId, 'staff', 'staff');
        } catch (error) {
            this.logger.instance.notify(error, function (event) {
                event.addMetadata('luce-staff', {
                    endpoint: 'contatti-data@getContattiData',
                    method: 'GET',
                    param: { podId, clientId },
                });
            });
            throw new BadRequestException(error);
        }
    }
}
