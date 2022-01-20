import { Controller, Get, Param, BadRequestException } from '@nestjs/common';
import { CasiDataService } from './casi-data.service';
import { BugsnagService } from '@nkaurelien/nest-bugsnag';

@Controller('casi-data')
export class CasiDataController {
    constructor(private readonly casiDataService: CasiDataService, private readonly logger: BugsnagService) {}

    @Get(':podId/:clientId')
    getCasiData(@Param('podId') podId: string, @Param('clientId') clientId: string) {
        try {
            return this.casiDataService.getCasiData(podId, clientId, 'staff', 'staff');
        } catch (error) {
            this.logger.instance.notify(error, function (event) {
                event.addMetadata('luce-staff', {
                    endpoint: 'casi-data@getCasiData',
                    method: 'GET',
                    param: { podId, clientId },
                });
            });
            throw new BadRequestException(error);
        }
    }
}
