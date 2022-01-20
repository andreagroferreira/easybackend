import { BadRequestException, Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';
import { BugsnagService } from '@nkaurelien/nest-bugsnag';

@Injectable()
export class ContattiDataService {
    constructor(private readonly connection: Connection, private readonly logger: BugsnagService) {}

    async getContattiData(podId: string, clientId: string, userRole: string, userLevel: string) {
        try {
            return await this.connection.query(`SELECT
     internalId,
     defaultAddress AS indirizzo,
     concat(COALESCE(email,""),
    (CASE WHEN a.altEmail IS NOT NULL THEN concat("email2: ", a.altEmail) ELSE "" END)) AS email,
    entityId AS Nome,
    title AS Ruolo,
   concat(COALESCE(phone,""),
    (CASE WHEN mobilePhone IS NOT NULL THEN concat(" mobile: ", mobilePhone) ELSE "" END),
    (CASE WHEN officePhone IS NOT NULL THEN concat(" ufficio: ", officePhone) ELSE "" END)) AS telefono,
    comments AS nota,
    CONCAT('https://system.eu2.netsuite.com/app/common/entity/contact.nl?id=', a.internalId) AS path,
    a.Company_ID AS ClientID,
    CASE 
      WHEN a.Company_ID = "${clientId}" THEN TRUE
      WHEN a.Company_ID <> "${clientId}" THEN FALSE 
    END AS IsOwner
  FROM eviso_new.netsuite_contacts a
    INNER JOIN eviso_new.netsuite_clients_all b
      ON  a.Company_ID = b.Cliente_Progetto__ID_interno
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
      ON  a.Company_ID = T.id_cliente
  WHERE b.POD =  "${podId}" 
    AND b.Cliente_Progetto__ID_interno REGEXP (TRIM(LEADING '0' FROM "${
        userRole === 'partner' || (userRole === 'staff' && userLevel === 'staff') ? '[[:digit:]]+' : clientId
    }"))
  GROUP by a.internalId`);
        } catch (error) {
            this.logger.instance.notify(error, function (event) {
                event.addMetadata('ContattiDataService', { endpoint: 'contatti-data@getContattiData', method: 'GET' });
            });
            throw new BadRequestException(error.sqlMessage);
        }
    }
}
