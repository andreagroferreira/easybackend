import { BadRequestException, Controller, Get, Param } from '@nestjs/common';
import { IbanDataService } from './iban-data.service';
import { BugsnagService } from '@nkaurelien/nest-bugsnag';

@Controller('iban-data')
export class IbanDataController {
    constructor(private readonly ibanDataService: IbanDataService, private readonly logger: BugsnagService) {}

    @Get(':clientId')
    getIbanData(@Param('clientId') clientId: string) {
        try {
            return this.ibanDataService.getIbanData(clientId);
        } catch (error) {
            this.logger.instance.notify(error, function (event) {
                event.addMetadata('luce-staff', {
                    endpoint: 'iban-data@getIbanData',
                    method: 'GET',
                    param: { clientId },
                });
            });
            throw new BadRequestException(error);
        }
    }
}
