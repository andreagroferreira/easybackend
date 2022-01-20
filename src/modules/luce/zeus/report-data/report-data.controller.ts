import { Controller, Get, Param, BadRequestException } from '@nestjs/common';
import { ReportDataService } from './report-data.service';
import { BugsnagService } from '@nkaurelien/nest-bugsnag';

@Controller('report-data')
export class ReportDataController {
    constructor(private readonly reportDataService: ReportDataService, private readonly logger: BugsnagService) {}

    @Get(':podId/:clientId')
    getReportData(@Param('podId') podId: string, @Param('clientId') clientId: string) {
        try {
            return this.reportDataService.getReportData(podId, clientId, 'staff', 'staff');
        } catch (error) {
            this.logger.instance.notify(error, function (event) {
                event.addMetadata('luce-zeus', {
                    endpoint: 'report-data@getReportData',
                    method: 'GET',
                    param: { podId, clientId },
                });
            });
            throw new BadRequestException(error);
        }
    }
}
