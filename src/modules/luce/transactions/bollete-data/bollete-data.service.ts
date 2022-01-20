import { BadRequestException, Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';
import { BugsnagService } from '@nkaurelien/nest-bugsnag';

@Injectable()
export class BolleteDataService {
    constructor(private readonly connection: Connection, private readonly logger: BugsnagService) {}

    async getBolleteData(podId: string, clientId: string, userRole: string, userLevel: string) {
        try {
            return await this.connection
                .query(`SELECT U.numero, U.Tipo_Bolletta, U.origine_dati, U.per_rif_in, U.per_rif_fine, U.Mese, U.Importo, U.Energia_Fatturata, U.nome_contratto, U.PDF, U.ClientID, U.IsOwner
  FROM ((SELECT
    n_ftt AS numero,
    tipo_ftt AS Tipo_Bolletta,
    origine_dati,
    per_rif_in,
    per_rif_fine,
    per_rif_fine AS Mese,
    ROUND(daniele_riepilogo_bollette.imponibile_TOT + IFNULL(IVA, 0) + IFNULL(bollo, 0) , 2) AS Importo,
    E_att_fatturata as Energia_Fatturata,
    nome_contratto,
    webapp_pdfs_clients.aws_key AS PDF,
    daniele_riepilogo_bollette.chi_paga_Idinterno AS ClientID,
    CASE 
        WHEN daniele_riepilogo_bollette.chi_paga_Idinterno = "${clientId}" THEN TRUE
        WHEN daniele_riepilogo_bollette.chi_paga_Idinterno <> "${clientId}" THEN FALSE 
      END AS IsOwner
  FROM eviso_new.daniele_riepilogo_bollette
    LEFT JOIN eviso_new.webapp_pdfs_clients
      ON 
      CASE
        WHEN RIGHT(daniele_riepilogo_bollette.nomefile,3) = "pdf" THEN daniele_riepilogo_bollette.nomefile
        WHEN RIGHT(daniele_riepilogo_bollette.nomefile,4) = "xlsm" THEN concat(LEFT(daniele_riepilogo_bollette.nomefile,LENGTH (daniele_riepilogo_bollette.nomefile)-4),'pdf')
        ELSE CONCAT(daniele_riepilogo_bollette.nomefile, ".pdf")
        END = webapp_pdfs_clients.filename
  WHERE daniele_riepilogo_bollette.POD = "${podId}"
    AND daniele_riepilogo_bollette.chi_paga_Idinterno REGEXP (TRIM(LEADING '0' FROM "${
        userRole === 'partner' || (userRole === 'staff' && userLevel === 'staff') ? '[[:digit:]]+' : clientId
    }"))
    AND webapp_pdfs_clients.duplicated IS NULL
  GROUP BY webapp_pdfs_clients.filename ,  n_ftt
  ORDER BY daniele_riepilogo_bollette.emissione DESC, webapp_pdfs_clients.created desc)
  UNION
  (SELECT
    n_ftt AS numero,
    tipo_ftt AS Tipo_Bolletta,
    origine_dati,
    per_rif_in,
    per_rif_fine,
    per_rif_fine AS Mese,
    ROUND(daniele_riepilogo_bollette.imponibile_TOT + IFNULL(IVA, 0) + IFNULL(bollo, 0) , 2) AS Importo,
    E_att_fatturata AS Energia_Fatturata,
    nome_contratto,
    webapp_pdfs_clients.aws_key AS PDF,
    daniele_riepilogo_bollette.chi_paga_Idinterno AS ClientID,
    CASE 
        WHEN daniele_riepilogo_bollette.chi_paga_Idinterno = "${clientId}" THEN TRUE
        WHEN daniele_riepilogo_bollette.chi_paga_Idinterno <> "${clientId}" THEN FALSE 
      END AS IsOwner
  FROM eviso_new.daniele_riepilogo_bollette
    INNER JOIN eviso_new.webapp_pdfs_clients
    ON
    -- controllare se si riferiscono alla stessa fattura
    -- controllando se la prima parte di filename include n_ftt senza la parte di sub-fattura
    SUBSTRING_INDEX(webapp_pdfs_clients.filename, '.', 1) LIKE CONCAT('%', REPLACE(SUBSTRING_INDEX(daniele_riepilogo_bollette.n_ftt, '/', 2), '/', ''), '%')
    -- controllare se si riferiscono allo stesso mese
    -- controllando se la terza parte del nome del file include lo stesso mese e anno
    AND RIGHT(SUBSTRING_INDEX(webapp_pdfs_clients.filename, '.', 3),5) = RIGHT(SUBSTRING_INDEX(daniele_riepilogo_bollette.nomefile, '.', 3),5)
    -- controlla se il client ha più pod
    -- controllando se il cliente ha n_ftt con la parte subcills (nnnnnnnn / yyyy / x, dove x è numerico)
    AND daniele_riepilogo_bollette.n_ftt REGEXP "^[[:digit:]]+/[[:digit:]]+/[[:digit:]]+$"
    -- controllando se il client ha multipod pdf nel server di dati zeus
    AND webapp_pdfs_clients.filename LIKE "%.M.multipod.%"
  WHERE daniele_riepilogo_bollette.POD = "${podId}"
    AND daniele_riepilogo_bollette.chi_paga_Idinterno REGEXP (TRIM(LEADING '0' FROM "${
        userRole === 'partner' || (userRole === 'staff' && userLevel === 'staff') ? '[[:digit:]]+' : clientId
    }"))
    AND webapp_pdfs_clients.duplicated IS NULL
  GROUP BY webapp_pdfs_clients.filename ,  n_ftt
  ORDER BY daniele_riepilogo_bollette.emissione DESC, webapp_pdfs_clients.created desc)) AS U
  WHERE PDF IS NOT NULL`);
        } catch (error) {
            this.logger.instance.notify(error, function (event) {
                event.addMetadata('BolleteDataService', {
                    endpoint: 'bollete-data@getBolleteData',
                    method: 'GET',
                });
            });
            throw new BadRequestException(error.sqlMessage);
        }
    }
}
