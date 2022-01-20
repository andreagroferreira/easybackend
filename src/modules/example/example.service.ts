import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { BugsnagService } from '@nkaurelien/nest-bugsnag';
import { PodsService } from '../luce/pods/pods.service';
import { LettureDataService } from '../luce/consumption/letture-data/letture-data.service';
import { PrezziDataService } from '../luce/consumption/prezzi-data/prezzi-data.service';
import { BolleteDataService } from '../luce/transactions/bollete-data/bollete-data.service';
import { ContatoriDataService } from '../luce/transactions/contatori-data/contatori-data.service';
import { EnergiaVerdeDataService } from '../luce/transactions/energia-verde-data/energia-verde-data.service';
import { FattureDataService } from '../luce/transactions/fatture-data/fatture-data.service';

@Injectable()
export class ExampleService {
    constructor(
        private readonly podsList: PodsService,
        private readonly letture: LettureDataService,
        private readonly prezziData: PrezziDataService,
        private readonly bolleteData: BolleteDataService,
        private readonly contatoriData: ContatoriDataService,
        private readonly energiaVerdeData: EnergiaVerdeDataService,
        private readonly fattureData: FattureDataService,
        private readonly logger: BugsnagService,
    ) {}

    exampleMethod() {
        return null;
    }

    async bootExample(id: string) {
        const pods = await this.podsList.findByClient(id);
        const result: Promise<any>[][] = [];
        for (const clients of pods) {
            const [lettureLoop, prezziLoop, bolleteLoop, contatoriLoop, energiaVerdeLoop, fattureLoop] =
                await Promise.all([
                    await this.letture.getLettureData(clients.POD, id, 'staff', 'staff'),
                    await this.prezziData.getPrezziDataByPOD(clients.POD, id, 'staff', 'staff'),
                    await this.bolleteData.getBolleteData(clients.POD, id, 'staff', 'staff'),
                    await this.contatoriData.getContatoriData(clients.POD, id, 'staff', 'staff'),
                    await this.energiaVerdeData.getEnergiaVerdeData(clients.POD, id, 'staff', 'staff'),
                    await this.fattureData.getFattureData(clients.POD, id, 'staff', 'staff'),
                ]);

            result.push({
                // @ts-ignore
                pod: clients.POD,
                // @ts-ignore
                letture: lettureLoop,
                // @ts-ignore
                prezzi: prezziLoop,
                bollete: bolleteLoop,
                contatori: contatoriLoop,
                energiaVerde: energiaVerdeLoop,
                fatture: fattureLoop,
            });
        }

        // @ts-ignore
        return result;
    }

    @Cron(CronExpression.EVERY_MINUTE)
    exampleCron() {
        try {
            // tslint:disable-next-line:no-console
            console.log('Cron is Working! Yay!!');
        } catch (e) {
            this.logger.instance.notify(e);
        }
    }
}
