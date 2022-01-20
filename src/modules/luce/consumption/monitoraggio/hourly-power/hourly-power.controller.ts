import { Controller, Get, Param, BadRequestException } from '@nestjs/common';
import { HourlyPowerService } from './hourly-power.service';
import { BugsnagService } from '@nkaurelien/nest-bugsnag';

@Controller('hourly-power')
export class HourlyPowerController {
    constructor(private readonly hourlyPowerService: HourlyPowerService, private readonly logger: BugsnagService) {}

    @Get(':podId/:clientId/:start/:end')
    getHourlyPower(
        @Param('podId') podId: string,
        @Param('clientId') clientId: string,
        @Param('start') start: string,
        @Param('end') end: string,
    ) {
        try {
            return this.hourlyPowerService.getHourlyPower(podId, clientId, 'staff', 'staff', start, end);
        } catch (error) {
            this.logger.instance.notify(error, function (event) {
                event.addMetadata('hourly-power', {
                    endpoint: 'hourly-power@getHourlyPower',
                    method: 'GET',
                    param: { podId, clientId, start, end },
                });
            });
            throw new BadRequestException(error);
        }
    }
}
