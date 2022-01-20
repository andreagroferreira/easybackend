import { BadRequestException, Controller, Get, Param } from '@nestjs/common';
import { PrezziDataService } from './prezzi-data.service';
import { BugsnagService } from '@nkaurelien/nest-bugsnag';

@Controller('prezzi-data')
export class PrezziDataController {
    constructor(private readonly prezziDataService: PrezziDataService, private readonly logger: BugsnagService) {}

    @Get(':podId/:clientId')
    getPrezziData(@Param('podId') podId: string, @Param('clientId') clientId: string) {
        try {
            return this.prezziDataService.getPrezziDataByPOD(podId, clientId, 'staff', 'staff');
        } catch (error) {
            this.logger.instance.notify(error, function (event) {
                event.addMetadata('luce-consumption', {
                    endpoint: 'prezzi-data@getPrezziData',
                    method: 'GET',
                    param: { podId, clientId },
                });
            });
            throw new BadRequestException(error);
        }
    }
}
