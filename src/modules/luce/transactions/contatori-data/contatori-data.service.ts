import { BadRequestException, Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';
import { BugsnagService } from '@nkaurelien/nest-bugsnag';

@Injectable()
export class ContatoriDataService {
    constructor(private readonly connection: Connection, private readonly logger: BugsnagService) {}

    async getContatoriData(podId: string, clientId: string, userRole: string, userLevel: string) {
        try {
            return await this.connection.query(`SELECT
    netsuite_clients_all.Numero_documento,
    netsuite_clients_all.Cliente_Progetto__Nome_societa as ClientName,
    netsuite_clients_all.Cliente_Progetto__ID_interno as ID,
    pod_list.Category AS Tipo,
    netsuite_clients_all.Citta AS Address_city,
    netsuite_clients_all.Indirizzo_fornitura,
    netsuite_clients_all.Provincia,
    netsuite_clients_all.Macro_Topology,
    CONCAT(netsuite_clients_all.Indirizzo_fornitura, "-", netsuite_clients_all.Citta, "-", netsuite_clients_all.Provincia) as indirizzo_completo,
    CONCAT(netsuite_clients_all.Indirizzo_sede_legale, "-", netsuite_clients_all.Citta_sede_legale, "-", netsuite_clients_all.Provincia_sede_legale) as sede_legale,
    netsuite_clients_all.ENERGY_E_GENIUS AS ENERGY_E_GENIUS,
    netsuite_clients_all.Cliente_moroso AS MOROSO,
    netsuite_clients_all.Partner_INATTIVO AS Partner_INATTIVO,
    netsuite_clients_all.Partner_Nome AS Partner,
    netsuite_clients_all.Potenza_disponibile AS Potenza,
    netsuite_clients_all.Cliente_Progetto__E_mail as Email,
    netsuite_clients_all.Cliente_Progetto___EVS__email_per_report as Email_report,
    netsuite_clients_all.Cliente_Progetto__Telefono_cellulare as cellulare,
    netsuite_clients_all.Cliente_Progetto__Telefono_alternativo as contatto_alternativo,
    netsuite_clients_all.Cliente_Progetto__Numero_di_telefono as telefono,
    netsuite_clients_all.Stato_fornitura as Stato,
    CASE WHEN Stato_fornitura = 'SWITCH CD' OR Stato_fornitura = 'Switch Ritardato' THEN 'In Switch' ELSE  Stato_fornitura END as Stato_cliente,
    netsuite_clients_all.Motivo_Win_Loss as Motivo_Win_Loss,
    netsuite_clients_all.fasce_contratto as Tariffa,
    netsuite_clients_all.tipo_contratto as tipo_contratto,
    netsuite_clients_all.notes,
   T.date_inizio as data_inizio_fornitura,
    netsuite_clients_all.partner_email,
    netsuite_clients_all.partner_telefono,
    netsuite_clients_all.dummysensor,
  CONCAT('https://system.eu2.netsuite.com/app/accounting/transactions/opprtnty.nl?id=', ID_transazione) AS path,
  netsuite_clients_all.Cliente_Progetto__ID_interno AS ClientID,
  CASE 
    WHEN netsuite_clients_all.Cliente_Progetto__ID_interno = "${clientId}" THEN TRUE
    WHEN netsuite_clients_all.Cliente_Progetto__ID_interno <> "${clientId}" THEN FALSE 
  END AS IsOwner
  FROM eviso_new.netsuite_clients_all
    LEFT OUTER JOIN eviso_new.pod_list
      ON netsuite_clients_all.POD = pod_list.POD
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
  WHERE netsuite_clients_all.POD = "${podId}" 
    AND netsuite_clients_all.Cliente_Progetto__ID_interno REGEXP (TRIM(LEADING '0' FROM "${
        userRole === 'partner' || (userRole === 'staff' && userLevel === 'staff') ? '[[:digit:]]+' : clientId
    }"))`);
        } catch (error) {
            this.logger.instance.notify(error, function (event) {
                event.addMetadata('ContatoriDataService', {
                    endpoint: 'contatori-data@getContatoriData',
                    method: 'GET',
                });
            });
            throw new BadRequestException(error.sqlMessage);
        }
    }
}
