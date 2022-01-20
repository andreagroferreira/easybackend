import { BadRequestException, Controller, Get, Param } from '@nestjs/common';
import { MetersListService } from './meters-list.service';
import { BugsnagService } from '@nkaurelien/nest-bugsnag';

@Controller('meters-list')
export class MetersListController {
    constructor(private readonly metersListService: MetersListService, private readonly logger: BugsnagService) {}

    @Get(':podId/:clientId')
    getMetersList(@Param('podId') podId: string, @Param('clientId') clientId: string) {
        try {
            return this.metersListService.getMetersList(podId, clientId, 'staff', 'staff');
        } catch (error) {
            this.logger.instance.notify(error, function (event) {
                event.addMetadata('luce-zeus', {
                    endpoint: 'meters-list@getMetersList',
                    method: 'GET',
                    param: { podId, clientId },
                });
            });
            throw new BadRequestException(error);
        }
    }
}
