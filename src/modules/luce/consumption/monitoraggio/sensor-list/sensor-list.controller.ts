import { BadRequestException, Controller, Get, Param } from '@nestjs/common';
import { SensorListService } from './sensor-list.service';
import { BugsnagService } from '@nkaurelien/nest-bugsnag';

@Controller('sensor-list')
export class SensorListController {
    constructor(private readonly sensorListService: SensorListService, private readonly logger: BugsnagService) {}

    @Get(':podId/:clientId')
    getSensorList(@Param('podId') podId: string, @Param('clientId') clientId: string) {
        try {
            return this.sensorListService.getSensorList(podId);
        } catch (error) {
            this.logger.instance.notify(error, function (event) {
                event.addMetadata('luce-zeus', {
                    endpoint: 'sensor-list@getSensorList',
                    method: 'GET',
                    param: { podId, clientId },
                });
            });
            throw new BadRequestException(error);
        }
    }
}
