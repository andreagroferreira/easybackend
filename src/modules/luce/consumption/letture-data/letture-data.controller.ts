import { Controller, Get, Param, BadRequestException } from '@nestjs/common';
import { LettureDataService } from './letture-data.service';
import { BugsnagService } from '@nkaurelien/nest-bugsnag';

@Controller('letture-data')
export class LettureDataController {
    constructor(private readonly lettureDataService: LettureDataService, private readonly logger: BugsnagService) {}

    @Get(':podId/:clientId')
    getLettureData(@Param('podId') podId: string, @Param('clientId') clientId: string) {
        try {
            return this.lettureDataService.getLettureData(podId, clientId, 'staff', 'staff');
        } catch (error) {
            this.logger.instance.notify(error, function (event) {
                event.addMetadata('luce-consumption', {
                    endpoint: 'letture-data@getLettureData',
                    method: 'GET',
                    param: { podId, clientId },
                });
            });
            throw new BadRequestException(error);
        }
    }
}
