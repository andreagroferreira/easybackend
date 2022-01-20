import { BadRequestException, Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';
import { BugsnagService } from '@nkaurelien/nest-bugsnag';

@Injectable()
export class IbanDataService {
    constructor(private readonly connection: Connection, private readonly logger: BugsnagService) {}
    async getIbanData(clientId: string) {
        try {
            return await this.connection.query(`select
  company_name as Nome
     ,iban as IBAN
     ,societa_madre as 'Societa_Madre'
     ,first_concluded as 'Prima_Concluso'
     ,ABI as ABI
     ,CAB as CAB
     ,sepa_id_mandato as 'SEPA_ID_Mandato'
     ,status as 'Stato_Fornitura'
   from eviso_new.netsuite_iban ni 
   where ni.id_interno = "${clientId}"`);
        } catch (error) {
            this.logger.instance.notify(error, function (event) {
                event.addMetadata('IbanDataService', { endpoint: 'iban-data@getIbanData', method: 'GET' });
            });
            throw new BadRequestException(error.sqlMessage);
        }
    }
}
