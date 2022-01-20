import { BadRequestException, Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';
import { BugsnagService } from '@nkaurelien/nest-bugsnag';

@Injectable()
export class CasiDataService {
    constructor(private readonly connection: Connection, private readonly logger: BugsnagService) {}
    async getCasiData(podId: string, clientId: string, userRole: string, userLevel: string) {
        try {
            return await this.connection.query(`SELECT
    netsuite_cases.Numero,
    netsuite_cases.Problema_caso AS Caso,
    netsuite_cases.Oggetto,
    netsuite_cases.Assegnato_a,
    STR_TO_DATE(netsuite_cases.Data_incidente, '%e/%m/%Y') AS Data,
    netsuite_cases.Contatto,
    netsuite_cases.Tipo,
    netsuite_cases.Stato,
    netsuite_cases.Societa_ID_interno AS ClientID,
    CASE 
      WHEN netsuite_cases.Societa_ID_interno = "${clientId}" THEN TRUE
      WHEN netsuite_cases.Societa_ID_interno <> "${clientId}" THEN FALSE 
    END AS IsOwner
  FROM eviso_new.netsuite_cases
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
        where netsuite_salesorders.POD = "${podId}"
          group by netsuite_salesorders.id_cliente) AS T
      ON netsuite_cases.Societa_ID_interno = T.id_cliente
  WHERE netsuite_cases.Societa_ID_interno REGEXP (TRIM(LEADING '0' FROM "${
      userRole === 'partner' || (userRole === 'staff' && userLevel === 'staff') ? '[[:digit:]]+' : clientId
  }"))
  GROUP BY netsuite_cases.Numero
  ORDER BY T.is_owner DESC, netsuite_cases.Numero DESC`);
        } catch (error) {
            this.logger.instance.notify(error, function (event) {
                event.addMetadata('CasiDataService', { endpoint: 'casi-data@getCasiData', method: 'GET' });
            });
            throw new BadRequestException(error.sqlMessage);
        }
    }
}
