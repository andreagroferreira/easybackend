import { BadRequestException, Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';
import { BugsnagService } from '@nkaurelien/nest-bugsnag';

@Injectable()
export class HourlyPowerService {
    constructor(private readonly connection: Connection, private readonly logger: BugsnagService) {}
    async getHourlyPower(
        podId: string,
        clientId: string,
        userRole: string,
        userLevel: string,
        start: string,
        end: string,
    ) {
        try {
            return await this.connection.query(`SELECT
  concat(hour(timestamp)+1,concat('H',DATE_FORMAT(timestamp," %d-%m"))) as time_for_graph,
  DATE_FORMAT(timestamp," %d-%m-%y") as date,
  DATE_FORMAT(timestamp,"%Y-%m-%d %T") as timestamp,
  DATE_FORMAT(CONVERT_TZ (timestamp,'Europe/Rome','UTC'),"%Y-%m-%dT%TZ") as timestamp2,
  round(ENEL,2)  AS ENEL,
  round(VOLTAIDE,2) AS VOLTAIDE,
  round(FLUKSO,2) AS FLUKSO,
  round(FLUKSO_FV,2) AS FLUKSO_FV,
  CASE WHEN 
        (timestamp > now() 
        OR timestamp > DATE_ADD((select max(timestamp) from eviso_new.carlo_tab_tot_raggruppati WHERE POD = '${podId}'), INTERVAL  48 hour)) 
        THEN null ELSE 
            (CASE WHEN isnull(FORECAST) 
                    AND  ENEL IS NOT NULL 
                    THEN round(ENEL,2)
                  WHEN isnull(FORECAST)
                    AND VOLTAIDE IS NOT NULL 
                    THEN round(VOLTAIDE,2) 
                  WHEN isnull(FORECAST)
                    AND FLUKSO IS NOT NULL 
                    THEN round(FLUKSO,2)  
                  ELSE round(FORECAST,2) END) END AS "CONSUMI TOTALI",
  year(timestamp)*100 + week(timestamp) AS YYYYWW,
  year(timestamp)*10000 + month(timestamp)*100 + DAY(timestamp) AS YYYYMMDD,
  year(timestamp)*100 + month(timestamp) AS YYYYMM,
  CASE WHEN (dataorigin=0 and ISNULL(enel)) THEN 2 ELSE 0 END as dataorigin
  FROM eviso_new.carlo_tab_tot_raggruppati
  INNER JOIN (
    SELECT 
      netsuite_salesorders.POD,
      netsuite_salesorders.id_cliente,
      MIN(STR_TO_DATE(netsuite_salesorders.date_inizio_fornitura, '%e/%c/%Y')) AS date_inizio,
      CASE
        WHEN sum(case when isnull(date_fine_contratto) THEN 1 ELSE 0 END) >0 THEN CURDATE()
        ELSE MAX(STR_TO_DATE(netsuite_salesorders.date_fine_contratto, '%e/%c/%Y'))
      END AS date_fine
    FROM eviso_new.netsuite_salesorders
    where netsuite_salesorders.POD = left('${podId}',14)
      group by netsuite_salesorders.id_cliente) as T
  ON 
    STR_TO_DATE(timestamp, '%Y-%m-%d') >= T.date_inizio AND 
    STR_TO_DATE(timestamp, '%Y-%m-%d') <= T.date_fine
  WHERE carlo_tab_tot_raggruppati.POD = '${podId}'
    AND timestamp >= '${start}' 
    AND timestamp < '${end}'
    AND T.id_cliente REGEXP (TRIM(LEADING '0' FROM "${
        userRole === 'partner' || (userRole === 'staff' && userLevel === 'staff') ? '[[:digit:]]+' : clientId
    }"))`);
        } catch (error) {
            this.logger.instance.notify(error, function (event) {
                event.addMetadata('HourlyPowerService', { endpoint: 'hourly-power@getHourlyPower', method: 'GET' });
            });
            throw new BadRequestException(error.sqlMessage);
        }
    }
}
