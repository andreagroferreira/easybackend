import { BadRequestException, Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';
import { BugsnagService } from '@nkaurelien/nest-bugsnag';

@Injectable()
export class SensorListService {
    constructor(private readonly connection: Connection, private readonly logger: BugsnagService) {}

    async getSensorList(podId: string) {
        try {
            return await this.connection.query(`SELECT DISTINCT
    POD AS sensor,
    replace(POD,"_"," ") AS sensor_no_underscore,
    section_parent_POD AS section_of,
    DAY(Min(timestamp)) + MONTH(Min(timestamp))*100 + YEAR(Min(timestamp)) *10000  AS start,
    DAY(Max(timestamp)) + MONTH(Max(timestamp))*100 + YEAR(Max(timestamp)) *10000 AS end
  FROM eviso_new.carlo_tab_tot_raggruppati
  WHERE POD LIKE "${podId}%"
  AND POD <> "${podId}"
  GROUP BY POD
  ORDER BY end DESC`);
        } catch (error) {
            this.logger.instance.notify(error, function (event) {
                event.addMetadata('SensorListService', {
                    endpoint: 'sensor-list@getSensorList',
                    method: 'GET',
                    param: { podId },
                });
            });
            throw new BadRequestException(error.sqlMessage);
        }
    }
}
