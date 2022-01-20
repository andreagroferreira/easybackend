import { Controller, Get, Param, BadRequestException } from '@nestjs/common';
import { FattureDataService } from './fatture-data.service';
import { BugsnagService } from '@nkaurelien/nest-bugsnag';

@Controller('fatture-data')
export class FattureDataController {
    constructor(private readonly fattureDataService: FattureDataService, private readonly logger: BugsnagService) {}

    @Get(':podId/:clientId')
    getFattureData(@Param('podId') podId: string, @Param('clientId') clientId: string) {
        try {
            return this.fattureDataService.getFattureData(podId, clientId, 'staff', 'staff');
        } catch (error) {
            this.logger.instance.notify(error, function (event) {
                event.addMetadata('luce-transactions', {
                    endpoint: 'fatture-data@getContatoriData',
                    method: 'GET',
                    param: { podId, clientId },
                });
            });
            throw new BadRequestException(error);
        }
    }
}
