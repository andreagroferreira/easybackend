import { BadRequestException, Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';
import { BugsnagService } from '@nkaurelien/nest-bugsnag';

@Injectable()
export class MetersListService {
    constructor(private readonly connection: Connection, private readonly logger: BugsnagService) {}

    async getMetersList(podId: string, clientId: string, userRole: string, userLevel: string) {
        try {
            return await this.connection.query(`SELECT
  day(MAX(CASE WHEN ENEL IS NOT NULL THEN timestamp END))+month(MAX(CASE WHEN ENEL > 0 THEN timestamp END))*100+year(MAX(CASE WHEN ENEL > 0 THEN timestamp END))*10000 AS Last_Enel,
  day(MAX(CASE WHEN FLUKSO IS NOT NULL THEN timestamp END))+month(MAX(CASE WHEN FLUKSO >= 0 THEN timestamp END))*100+year(MAX(CASE WHEN FLUKSO >= 0 THEN timestamp END))*10000 AS Last_Flukso,
  day(MAX(CASE WHEN VOLTAIDE IS NOT NULL THEN timestamp END))+month(MAX(CASE WHEN VOLTAIDE > 0 THEN timestamp END))*100+year(MAX(CASE WHEN VOLTAIDE > 0 THEN timestamp END))*10000 AS Last_Voltaide,
  day(MAX(CASE WHEN FLUKSO_FV IS NOT NULL THEN timestamp END))+month(MAX(CASE WHEN FLUKSO_FV > 0 THEN timestamp END))*100+year(MAX(CASE WHEN FLUKSO_FV > 0 THEN timestamp END))*10000 AS Last_Flukso_FV,
  day(now())+month(now())*100+year(now())*10000 AS Last_forecast,
  day(MIN(CASE WHEN ENEL IS NOT NULL THEN timestamp END))+month(MIN(CASE WHEN ENEL > 0 THEN timestamp END))*100+year(MIN(CASE WHEN ENEL > 0 THEN timestamp END))*10000 AS First_Enel,
  day(MIN(CASE WHEN FLUKSO IS NOT NULL THEN timestamp END))+month(MIN(CASE WHEN FLUKSO >= 0 THEN timestamp END))*100+year(MIN(CASE WHEN FLUKSO >= 0 THEN timestamp END))*10000 AS First_Flukso,
  day(MIN(CASE WHEN VOLTAIDE IS NOT NULL THEN timestamp END))+month(MIN(CASE WHEN VOLTAIDE > 0 THEN timestamp END))*100+year(MIN(CASE WHEN VOLTAIDE > 0 THEN timestamp END))*10000 AS First_Voltaide,
  day(MIN(CASE WHEN FLUKSO_FV IS NOT NULL THEN timestamp END))+month(MIN(CASE WHEN FLUKSO_FV > 0 THEN timestamp END))*100+year(MIN(CASE WHEN FLUKSO_FV > 0 THEN timestamp END))*10000 AS First_Flukso_FV,
  day(MIN(CASE WHEN FORECAST IS NOT NULL THEN timestamp END))+month(MIN(CASE WHEN FORECAST > 0 THEN timestamp END))*100+year(MIN(CASE WHEN FORECAST > 0 THEN timestamp END))*10000 AS First_forecast
  FROM eviso_new.carlo_tab_tot_raggruppati
    INNER JOIN (
      SELECT 
        netsuite_salesorders.POD,
        netsuite_salesorders.id_cliente,
        MIN(STR_TO_DATE(netsuite_salesorders.date_inizio_fornitura, '%e/%m/%Y')) AS date_inizio,
        CASE
          WHEN sum(case when isnull(date_fine_contratto) THEN 1 ELSE 0 END) >0 THEN CURDATE()
          ELSE MAX(STR_TO_DATE(netsuite_salesorders.date_fine_contratto, '%e/%m/%Y'))
        END AS date_fine,
        CASE
          WHEN sum(case when isnull(date_fine_contratto) THEN 1 ELSE 0 END) >0 THEN TRUE
          ELSE FALSE
        END AS is_owner
      FROM eviso_new.netsuite_salesorders
      WHERE netsuite_salesorders.POD = "${podId}"
        GROUP BY netsuite_salesorders.id_cliente ) AS T
    ON carlo_tab_tot_raggruppati.POD = T.POD
    AND carlo_tab_tot_raggruppati.timestamp >= T.date_inizio
    AND carlo_tab_tot_raggruppati.timestamp < DATE_ADD(T.date_fine, INTERVAL 1 DAY)
  WHERE carlo_tab_tot_raggruppati.POD = "${podId}"
  ${userRole === 'staff' && userLevel === 'staff' ? '' : `AND T.id_cliente = "${clientId}"`}
  GROUP BY carlo_tab_tot_raggruppati.POD`);
        } catch (error) {
            this.logger.instance.notify(error, function (event) {
                event.addMetadata('MetersListService', {
                    endpoint: 'meters-lista@getMetersList',
                    method: 'GET',
                    param: { podId, clientId },
                });
            });
            throw new BadRequestException(error.sqlMessage);
        }
    }
}
