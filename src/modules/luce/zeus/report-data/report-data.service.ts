import { BadRequestException, Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';
import { BugsnagService } from '@nkaurelien/nest-bugsnag';

@Injectable()
export class ReportDataService {
    constructor(private readonly connection: Connection, private readonly logger: BugsnagService) {}

    async getReportData(podId: string, clientId: string, userRole: string, userLevel: string) {
        try {
            return await this.connection.query(`
  SELECT
	  concat("Riepilogo_files",RIGHT(webapp_pdfs_clients.path,LENGTH(webapp_pdfs_clients.path)-28)) AS PDF,
    DATE_SUB(webapp_pdfs_clients.created, INTERVAL 1 MONTH) as Mese,
    T.id_cliente AS ClientID,
    CASE 
      WHEN T.id_cliente = "${clientId}" THEN TRUE
      WHEN T.id_cliente <> "${clientId}" THEN FALSE 
    END AS IsOwner
  FROM eviso_new.webapp_pdfs_clients
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
        group by netsuite_salesorders.id_cliente) as T
    ON 
      DATE_SUB(webapp_pdfs_clients.created, INTERVAL 1 MONTH) >= T.date_inizio 
      AND DATE_SUB(webapp_pdfs_clients.created, INTERVAL 1 MONTH) <= T.date_fine
  WHERE 
    webapp_pdfs_clients.type = 'report'
    AND webapp_pdfs_clients.POD = "${podId}"
    AND T.id_cliente REGEXP (TRIM(LEADING '0' FROM "${
        userRole === 'partner' || (userRole === 'staff' && userLevel === 'staff') ? '[[:digit:]]+' : clientId
    }"))
  ORDER BY Mese DESC`);
        } catch (error) {
            this.logger.instance.notify(error, function (event) {
                event.addMetadata('ReportDataService', {
                    endpoint: 'report-data@getReportData',
                    method: 'GET',
                    param: { podId, clientId },
                });
            });
            throw new BadRequestException(error.sqlMessage);
        }
    }
}
