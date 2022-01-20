import { BadRequestException, Injectable } from '@nestjs/common';
import { BugsnagService } from '@nkaurelien/nest-bugsnag';
import { Connection } from 'typeorm';

@Injectable()
export class PrezziDataService {
    constructor(private readonly connection: Connection, private readonly logger: BugsnagService) {}

    async getPrezziDataByPOD(podId: string, clientId: string, userRole: string, userLevel: string) {
        try {
            return await this.connection.query(`
  SELECT
  LEFT(kappa_prezzi.annomese, 4) * 100 + RIGHT(kappa_prezzi.annomese, 2) AS YYYYMM,
  STR_TO_DATE(concat(kappa_prezzi.annomese,'.01'), '%Y.%m.%d') as mese,
  kappa_prezzi.contratto,
  kappa_prezzi.min_energia,
  daniele_riepilogo_bollette.E_att_fatturata,
  kappa_prezzi.max_energia,
  kappa_prezzi.tipo,
  netsuite_clients_all.fasce_contratto as Tariffa,
  CASE
    WHEN netsuite_clients_all.fasce_contratto = 'Mono' THEN kappa_prezzi.F1_mono
    WHEN netsuite_clients_all.fasce_contratto = 'Biorario' THEN kappa_prezzi.F1_bi
    WHEN netsuite_clients_all.fasce_contratto = 'Per fasce' THEN kappa_prezzi.F1_fasce END AS F1,
  CASE
    WHEN netsuite_clients_all.fasce_contratto = 'Mono' THEN NULL
    WHEN netsuite_clients_all.fasce_contratto = 'Biorario' THEN kappa_prezzi.F2_bi
    WHEN netsuite_clients_all.fasce_contratto = 'Per fasce' THEN kappa_prezzi.F2_fasce END AS F2,
  CASE
    WHEN netsuite_clients_all.fasce_contratto = 'Mono' THEN NULL
    WHEN netsuite_clients_all.fasce_contratto = 'Biorario' THEN NULL
    WHEN netsuite_clients_all.fasce_contratto = 'Per fasce' THEN kappa_prezzi.F3_fasce END AS F3,
  daniele_riepilogo_bollette.chi_paga_Idinterno AS ClientID,
  CASE 
    WHEN daniele_riepilogo_bollette.chi_paga_Idinterno = "${clientId}" THEN TRUE
    WHEN daniele_riepilogo_bollette.chi_paga_Idinterno <> "${clientId}" THEN FALSE 
  END AS IsOwner
FROM eviso_new.netsuite_clients_all
  INNER JOIN nestore.kappa_prezzi
    ON netsuite_clients_all.tipo_contratto = kappa_prezzi.contratto
  INNER JOIN eviso_new.daniele_riepilogo_bollette
    ON netsuite_clients_all.POD = daniele_riepilogo_bollette.POD
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
    ON daniele_riepilogo_bollette.chi_paga_Idinterno = T.id_cliente
WHERE netsuite_clients_all.POD = "${podId}" 
      AND daniele_riepilogo_bollette.chi_paga_Idinterno REGEXP (TRIM(LEADING '0' FROM "${
          userRole === 'partner' || (userRole === 'staff' && userLevel === 'staff') ? '[[:digit:]]+' : clientId
      }"))
      AND LEFT(kappa_prezzi.annomese, 4) * 100 + RIGHT(kappa_prezzi.annomese, 2)= MONTH(per_rif_fine) + YEAR(per_rif_fine) *100
      AND daniele_riepilogo_bollette.E_att_fatturata > kappa_prezzi.min_energia
      AND daniele_riepilogo_bollette.E_att_fatturata < kappa_prezzi.max_energia
      AND netsuite_clients_all.Stato_fornitura = 'In Fornitura'
  HAVING    E_att_fatturata < kappa_prezzi.max_energia`);
        } catch (error) {
            this.logger.instance.notify(error, function (event) {
                event.addMetadata('PrezziDataService', { endpoint: 'prezzi-data@getPrezziDataByPOD', method: 'GET' });
            });
            throw new BadRequestException(error.sqlMessage);
        }
    }
}
