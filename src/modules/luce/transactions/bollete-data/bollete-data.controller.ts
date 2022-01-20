import { Controller, Get, Param, BadRequestException } from '@nestjs/common';
import { BolleteDataService } from './bollete-data.service';
import { BugsnagService } from '@nkaurelien/nest-bugsnag';

@Controller('bollete-data')
export class BolleteDataController {
    constructor(private readonly bolleteDataService: BolleteDataService, private readonly logger: BugsnagService) {}

    @Get(':podId/:clientId')
    getBolleteData(@Param('podId') podId: string, @Param('clientId') clientId: string) {
        try {
            return this.bolleteDataService.getBolleteData(podId, clientId, 'staff', 'staff');
        } catch (error) {
            this.logger.instance.notify(error, function (event) {
                event.addMetadata('luce-transactions', {
                    endpoint: 'bollete-data@getBolleteData',
                    method: 'GET',
                    param: { podId, clientId },
                });
            });
            throw new BadRequestException(error);
        }
    }
}
