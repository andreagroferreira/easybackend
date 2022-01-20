import { Controller, Get, Param, BadRequestException } from '@nestjs/common';
import { VisiteDataService } from './visite-data.service';
import { BugsnagService } from '@nkaurelien/nest-bugsnag';

@Controller('visite-data')
export class VisiteDataController {
    constructor(private readonly visiteDataService: VisiteDataService, private readonly logger: BugsnagService) {}

    @Get(':podId/:clientId')
    getVisiteData(@Param('podId') podId: string, @Param('clientId') clientId: string) {
        try {
            return this.visiteDataService.getVisiteData(podId);
        } catch (error) {
            this.logger.instance.notify(error, function (event) {
                event.addMetadata('luce-staff', {
                    endpoint: 'visite-data@getVisiteData',
                    method: 'GET',
                    param: { podId, clientId },
                });
            });
            throw new BadRequestException(error);
        }
    }
}
