import { BadRequestException, Controller, Get, Param } from '@nestjs/common';
import { AllertDataService } from './allert-data.service';
import { BugsnagService } from '@nkaurelien/nest-bugsnag';

@Controller('allerte-data')
export class AllertDataController {
    constructor(private readonly allertDataService: AllertDataService, private readonly logger: BugsnagService) {}

    @Get(':podId/:clientId')
    getAlertData(@Param('podId') podId: string, @Param('clientId') clientId: string) {
        try {
            return this.allertDataService.getAlertData(podId, clientId, 'staff', 'staff');
        } catch (error) {
            this.logger.instance.notify(error, function (event) {
                event.addMetadata('luce-zeus', {
                    endpoint: 'allerte-data@getAlertData',
                    method: 'GET',
                    param: { podId, clientId },
                });
            });
            throw new BadRequestException(error);
        }
    }
}
