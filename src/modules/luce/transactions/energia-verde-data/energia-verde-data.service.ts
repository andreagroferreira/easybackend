import { BadRequestException, Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';
import { BugsnagService } from '@nkaurelien/nest-bugsnag';

@Injectable()
export class EnergiaVerdeDataService {
    constructor(private readonly connection: Connection, private readonly logger: BugsnagService) {}

    async getEnergiaVerdeData(podId: string, clientId: string, userRole: string, userLevel: string) {
        try {
            return await this.connection.query(`SELECT
	DATE_SUB(webapp_pdfs_energia_verde_2019.created, INTERVAL 1 YEAR) as Anno,
	webapp_pdfs_energia_verde_2019.POD,
	webapp_pdfs_energia_verde_2019.aws_key AS PDF,
    T.id_cliente AS ClientID,
    CASE 
      WHEN T.id_cliente = "${clientId}" THEN TRUE
      WHEN T.id_cliente <> "${clientId}" THEN FALSE 
    END AS IsOwner
  FROM eviso_new.webapp_pdfs_energia_verde_2019
  	INNER JOIN (
      SELECT 
        netsuite_salesorders.POD,
        netsuite_salesorders.id_cliente,
        MIN(STR_TO_DATE(netsuite_salesorders.date_inizio_fornitura, '%e/%m/%Y')) AS date_inizio,
        CASE
          WHEN sum(CASE WHEN isnull(date_fine_contratto) THEN 1 ELSE 0 END) >0 THEN CURDATE()
          ELSE MAX(STR_TO_DATE(netsuite_salesorders.date_fine_contratto, '%e/%m/%Y'))
        END AS date_fine,
        CASE
          WHEN sum(CASE WHEN isnull(date_fine_contratto) THEN 1 ELSE 0 END) >0 THEN TRUE
          ELSE FALSE
        END AS is_owner
      FROM eviso_new.netsuite_salesorders
      WHERE netsuite_salesorders.POD = "${podId}"
      GROUP BY netsuite_salesorders.id_cliente) AS T
    ON 
      DATE_SUB(webapp_pdfs_energia_verde_2019.created, INTERVAL 1 YEAR) >= T.date_inizio 
      AND DATE_SUB(webapp_pdfs_energia_verde_2019.created, INTERVAL 1 YEAR) <= T.date_fine
  WHERE
    webapp_pdfs_energia_verde_2019.type = 'energia_verde_certificato'
    AND webapp_pdfs_energia_verde_2019.POD = "${podId}"
    AND T.id_cliente REGEXP (TRIM(LEADING '0' FROM "${
        userRole === 'partner' || (userRole === 'staff' && userLevel === 'staff') ? '[[:digit:]]+' : clientId
    }"))
  ORDER BY Anno DESC`);
        } catch (error) {
            this.logger.instance.notify(error, function (event) {
                event.addMetadata('EnergiaVerdeDataService', {
                    endpoint: 'energia-verde-data@EnergiaVerdeDataService',
                    method: 'GET',
                });
            });
            throw new BadRequestException(error.sqlMessage);
        }
    }
}
