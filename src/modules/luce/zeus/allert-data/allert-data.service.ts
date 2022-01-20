import { BadRequestException, Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';
import { BugsnagService } from '@nkaurelien/nest-bugsnag';

@Injectable()
export class AllertDataService {
    constructor(private readonly connection: Connection, private readonly logger: BugsnagService) {}

    async getAlertData(podId: string, clientId: string, userRole: string, userLevel: string) {
        try {
            return await this.connection.query(`
  SELECT
    id,
    date(paolo_storico_allerte.Alert_date) AS Data,
    paolo_storico_allerte.Alert_type AS Tipo,
    paolo_storico_allerte.Alert_subtype AS Subtipo,
    CASE WHEN Alert_type = 'reattiva' THEN concat(ROUND(paolo_storico_allerte.Alert_value,0), ' €') ELSE concat (round(paolo_storico_allerte.Alert_value,0), ' %') END  AS Valore,
    paolo_storico_allerte.SMS,
    paolo_storico_allerte.SMS_number,
    paolo_storico_allerte.MAIL,
    paolo_storico_allerte.MAIL_address,
    paolo_storico_allerte.version_text,
    netsuite_clients_all.Cliente_Progetto__ID_interno AS ClientID,
    CASE 
      WHEN netsuite_clients_all.Cliente_Progetto__ID_interno = "${clientId}" THEN TRUE
      WHEN netsuite_clients_all.Cliente_Progetto__ID_interno <> "${clientId}" THEN FALSE 
    END AS IsOwner
  FROM eviso_new.paolo_storico_allerte
    INNER JOIN eviso_new.netsuite_clients_all
    ON paolo_storico_allerte.Client_name = netsuite_clients_all.Cliente_Progetto__Nome_societa
    LEFT JOIN (
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
  WHERE paolo_storico_allerte.POD = "${podId}" 
    AND netsuite_clients_all.Cliente_Progetto__ID_interno REGEXP (TRIM(LEADING '0' FROM "${
        userRole === 'partner' || (userRole === 'staff' && userLevel === 'staff') ? '[[:digit:]]+' : clientId
    }"))
  ORDER BY Alert_date DESC`);
        } catch (error) {
            this.logger.instance.notify(error, function (event) {
                event.addMetadata('AllertDataService', {
                    endpoint: 'allerte-data@getAlertData',
                    method: 'GET',
                    param: { podId, clientId },
                });
            });
            throw new BadRequestException(error.sqlMessage);
        }
    }
}
