import { Controller, Get, Param } from '@nestjs/common';
import { EnergiaVerdeDataService } from './energia-verde-data.service';

@Controller('energia-verde-data')
export class EnergiaVerdeDataController {
    constructor(private readonly energiaVerdeDataService: EnergiaVerdeDataService) {}

    @Get(':podId/:clientId')
    getEnergiaVerdeData(@Param('podId') podId: string, @Param('clientId') clientId: string) {
        return this.energiaVerdeDataService.getEnergiaVerdeData(podId, clientId, 'staff', 'staff');
    }
}
