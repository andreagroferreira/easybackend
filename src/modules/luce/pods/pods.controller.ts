import { BadRequestException, Controller, Get, Param } from '@nestjs/common';
import { PodsService } from './pods.service';
import { BugsnagService } from '@nkaurelien/nest-bugsnag';

@Controller('pods')
export class PodsController {
    constructor(private readonly podsService: PodsService, private readonly logger: BugsnagService) {}

    @Get()
    findAll() {
        return this.podsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.podsService.findOne(+id);
    }

    @Get('/clientPodList/:clientId')
    clientPodList(@Param('clientId') clientId: string) {
        try {
            return this.podsService.findByClient(clientId);
        } catch (error) {
            this.logger.instance.notify(error, function (event) {
                event.addMetadata('pods', {
                    endpoint: 'pods@clientPodList',
                    method: 'GET',
                });
            });
            throw new BadRequestException(error);
        }
    }
}
