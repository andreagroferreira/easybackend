import { BadRequestException, Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';
import { BugsnagService } from '@nkaurelien/nest-bugsnag';

@Injectable()
export class FattureDataService {
    constructor(private readonly connection: Connection, private readonly logger: BugsnagService) {}
    async getFattureData(podId: string, clientId: string, userRole: string, userLevel: string) {
        try {
            return await this.connection.query(`
  SELECT
   STR_TO_DATE(netsuite_invoices.Data, '%d/%m/%Y') AS Data,
   netsuite_invoices.Numero,
   REPLACE(netsuite_invoices.Importo, "=", "") AS Importo,
   netsuite_invoices.Tipologia_servizi,
   CONCAT('https://system.eu2.netsuite.com/app/accounting/transactions/custinvc.nl?id=', internal_ID) AS path,
   netsuite_clients_all.Cliente_Progetto__ID_interno AS ClientID,
   CASE 
      WHEN netsuite_clients_all.Cliente_Progetto__ID_interno = "${clientId}" THEN TRUE
      WHEN netsuite_clients_all.Cliente_Progetto__ID_interno <> "${clientId}" THEN FALSE 
    END AS IsOwner
 FROM eviso_new.netsuite_invoices
   INNER JOIN eviso_new.netsuite_clients_all
     ON netsuite_invoices.ID_Interno = netsuite_clients_all.Cliente_Progetto__ID_interno
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
      ON netsuite_clients_all.Cliente_Progetto__ID_interno = T.id_cliente
 WHERE netsuite_clients_all.POD = "${podId}" 
  AND netsuite_clients_all.Cliente_Progetto__ID_interno REGEXP (TRIM(LEADING '0' FROM "${
      userRole === 'partner' || (userRole === 'staff' && userLevel === 'staff') ? '[[:digit:]]+' : clientId
  }"))
 GROUP BY netsuite_invoices.Numero
 ORDER BY Data DESC`);
        } catch (error) {
            this.logger.instance.notify(error, function (event) {
                event.addMetadata('FattureDataService', {
                    endpoint: 'fatture-data@getFattureData',
                    method: 'GET',
                    param: { podId, clientId },
                });
            });
            throw new BadRequestException(error.sqlMessage);
        }
    }
}
