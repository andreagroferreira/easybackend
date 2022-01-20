import { BadRequestException, Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';
import { BugsnagService } from '@nkaurelien/nest-bugsnag';

@Injectable()
export class LettureDataService {
    constructor(private readonly connection: Connection, private readonly logger: BugsnagService) {}

    async getLettureData(podId: string, clientId: string, userRole: string, userLevel: string) {
        try {
            const result = await this.connection.query(`SELECT DISTINCT
  U.YYYYMM, U.YYYY, U.mese, U.Origine, U.F1, U.F2, U.F3, U.Consumo, U.R1, U.R2, U.R3, U.P1, U.P2, U.P3, U.Potenza_Max, U.Potenza_Disp, U.penale_rea_50_75, U.penale_rea_75,
  CASE
      WHEN U.Origine = "'STORICO'" THEN "-"
      ELSE T.id_cliente
  END AS ClientID,
  CASE 
    WHEN U.Origine = "'STORICO'" THEN FALSE
    WHEN T.id_cliente = "${clientId}" THEN TRUE
    WHEN T.id_cliente <> "${clientId}" THEN FALSE 
  END AS IsOwner
  FROM (
    SELECT
      LEFT(mmYYYY, LENGTH(daniele_letture_dafour.mmYYYY) - 5) + RIGHT(daniele_letture_dafour.mmYYYY, 4) * 100 AS YYYYMM,
      RIGHT(daniele_letture_dafour.mmYYYY, 4) AS YYYY,
      STR_TO_DATE(concat('1.',mmYYYY),'%d.%m.%Y') as mese,
      daniele_letture_dafour.source as Origine,
      ROUND(daniele_letture_dafour.F1 - daniele_letture_dafour.zero_F1, 0) AS F1,
      ROUND(daniele_letture_dafour.F2 - daniele_letture_dafour.zero_F2, 0) AS F2,
      ROUND(daniele_letture_dafour.F3 - daniele_letture_dafour.zero_F3, 0) AS F3,
      ROUND(daniele_letture_dafour.F1 - daniele_letture_dafour.zero_F1, 0) + ROUND(daniele_letture_dafour.F2 - daniele_letture_dafour.zero_F2, 0) + ROUND(daniele_letture_dafour.F3 - daniele_letture_dafour.zero_F3, 0) AS Consumo,
      ROUND(daniele_letture_dafour.R1 - daniele_letture_dafour.zero_R1, 0) AS R1,
      ROUND(daniele_letture_dafour.R2 - daniele_letture_dafour.zero_R2, 0) AS R2,
      ROUND(daniele_letture_dafour.R3 - daniele_letture_dafour.zero_R3, 0) AS R3,
      daniele_letture_dafour.P1,
      daniele_letture_dafour.P2,
      daniele_letture_dafour.P3,
      CASE 
        WHEN daniele_letture_dafour.P1 >= daniele_letture_dafour.P2 AND daniele_letture_dafour.P1 >= daniele_letture_dafour.P3 THEN daniele_letture_dafour.P1
        WHEN daniele_letture_dafour.P2 >= daniele_letture_dafour.P1 AND daniele_letture_dafour.P2 >= daniele_letture_dafour.P3 THEN daniele_letture_dafour.P2
        WHEN daniele_letture_dafour.P3 >= daniele_letture_dafour.P1 AND daniele_letture_dafour.P3 >= daniele_letture_dafour.P2 THEN daniele_letture_dafour.P3 
      END AS Potenza_Max,
      B.P_disp AS Potenza_Disp,
      B.penale_rea_50_75,
      B.penale_rea_75      
    FROM eviso_new.daniele_letture_dafour
    LEFT JOIN (
        SELECT 
          daniele_riepilogo_bollette.POD, 
          daniele_riepilogo_bollette.P_disp,
          max(daniele_riepilogo_bollette.per_rif_fine) AS per_rif_fine,
          daniele_riepilogo_bollette.penale_rea_50_75,
          daniele_riepilogo_bollette.penale_rea_75
        FROM eviso_new.daniele_riepilogo_bollette
        WHERE daniele_riepilogo_bollette.POD = '${podId}'
        GROUP BY MONTH(daniele_riepilogo_bollette.per_rif_fine) + YEAR(daniele_riepilogo_bollette.per_rif_fine)*100
      ) AS B
    	ON (B.POD = MID(daniele_letture_dafour.POD,2,14) AND 
      		MONTH(B.per_rif_fine)+YEAR(B.per_rif_fine)*100 = LEFT(daniele_letture_dafour.mmYYYY, LENGTH(daniele_letture_dafour.mmYYYY) - 5)*1 + RIGHT(daniele_letture_dafour.mmYYYY, 4) * 100)
    WHERE daniele_letture_dafour.POD = "\\'${podId}\\'"
    -- ORDER BY YYYYMM DESC
  UNION
    SELECT
      month(per_rif_fine)+year(per_rif_fine)*100 AS YYYYMM,
      year(per_rif_fine) AS YYYY,
      per_rif_fine AS mese,
      'stimati' as Origine,
      E_att_F1 AS F1,
      E_att_F2 AS F2,
      E_att_F3 AS F3,
      E_att_fatturata  AS Consumo,
      E_rea_F1 AS R1,
      E_rea_F2 AS R2,
      E_rea_F3 AS R3,
      "" AS P1,
      "" AS P2,
      "" AS P3,
      "stima" AS Potenza_Max,
      P_disp as Potenza_Disp,
      penale_rea_50_75,
      penale_rea_75
    FROM  eviso_new.daniele_riepilogo_bollette 
    LEFT JOIN (SELECT Mid(POD,2,14) AS POD_new,
      LEFT(mmYYYY, LENGTH(mmYYYY) - 5)*1 + RIGHT(mmYYYY, 4) * 100 AS YYYYMM
      FROM eviso_new.daniele_letture_dafour 
      WHERE POD = "\\'${podId}\\'" 
      GROUP BY mmYYYY) AS a
    ON (daniele_riepilogo_bollette.POD = a.POD_new AND 
      month(daniele_riepilogo_bollette.per_rif_fine)+year(daniele_riepilogo_bollette.per_rif_fine)*100  = a.YYYYMM)
    WHERE daniele_riepilogo_bollette.POD = '${podId}' AND origine_dati = 'stimati da dati storici' aND  a.POD_new IS NULL
      AND IFNULL(LENGTH(n_nota_credito), 0) = 0
    ORDER BY YYYYMM DESC
  ) as U
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
    WHERE netsuite_salesorders.POD = '${podId}'
    GROUP BY netsuite_salesorders.id_cliente
  ) AS T
  ON 
    STR_TO_DATE(DATE_FORMAT(U.mese, '%e/%m/%Y'), '%e/%m/%Y') >= T.date_inizio 
      AND	STR_TO_DATE(DATE_FORMAT(U.mese, '%e/%m/%Y'), '%e/%m/%Y') <= T.date_fine
      AND T.id_cliente REGEXP (TRIM(LEADING '0' FROM "${
          userRole === 'partner' || (userRole === 'staff' && userLevel === 'staff') ? '[[:digit:]]+' : clientId
      }"))
      OR U.Origine = "'STORICO'"
  CROSS JOIN (
    SELECT 
    R.id_cliente AS first_owner
    FROM (
      SELECT
        netsuite_salesorders.id_cliente,
        SUM(CASE
            WHEN netsuite_salesorders.date_inizio_fornitura = (
            SELECT MIN(STR_TO_DATE(netsuite_salesorders.date_inizio_fornitura, '%e/%m/%Y'))
            FROM eviso_new.netsuite_salesorders
            WHERE netsuite_salesorders.POD = "${podId}")THEN TRUE
            ELSE FALSE
          END) AS first_owner
      FROM eviso_new.netsuite_salesorders
      WHERE netsuite_salesorders.POD = "${podId}"
      GROUP BY id_cliente
      ORDER BY first_owner DESC ) AS R
    LIMIT 1) AS S
    ${
        userRole === 'partner' || (userRole === 'staff' && userLevel === 'staff')
            ? ''
            : `WHERE S.first_owner = "${clientId}" OR (S.first_owner <> "${clientId}" AND U.Origine <> "'STORICO'")`
    }
  ORDER BY YYYYMM DESC`);

            return result;
        } catch (error) {
            this.logger.instance.notify(error, function (event) {
                event.addMetadata('LettureDataService', { endpoint: 'letture-data@getLettureData', method: 'GET' });
            });
            throw new BadRequestException(error.sqlMessage);
        }
    }
}
