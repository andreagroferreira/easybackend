import { BadRequestException, Injectable } from '@nestjs/common';
import { Connection, Repository } from 'typeorm';
import { NetsuiteClientsAll } from '../../entities/netsuite_clients_all';
import { InjectRepository } from '@nestjs/typeorm';
import { BugsnagService } from '@nkaurelien/nest-bugsnag';

@Injectable()
export class PodsService {
    constructor(
        @InjectRepository(NetsuiteClientsAll)
        private readonly netsuiteClientsAllRepository: Repository<NetsuiteClientsAll>,
        private readonly connection: Connection,
        private readonly logger: BugsnagService,
    ) {}

    findAll() {
        return `This action returns all pods`;
    }

    async findByClient(clientId: string) {
        try {
            return await this.connection.query(`
      SELECT
      DISTINCT DISTINCT (netsuite_clients_all.POD), netsuite_clients_all.Indirizzo_fornitura, netsuite_clients_all.Citta AS Address_city, netsuite_clients_all.Potenza_disponibile, 
      CASE WHEN netsuite_clients_all.Stato_fornitura = 'SWITCH CD' OR netsuite_clients_all.Stato_fornitura = 'Switch Ritardato'THEN 'In Switch' ELSE  netsuite_clients_all.Stato_fornitura END as Stato_cliente
      FROM eviso_new.netsuite_clients_all 
      INNER JOIN eviso_new.netsuite_clients_all netsuite_clients_all_1 ON netsuite_clients_all.Cliente_Progetto__ID_interno = netsuite_clients_all_1.Cliente_Progetto__ID_interno 
      WHERE netsuite_clients_all_1.Cliente_Progetto__ID_interno = "${clientId}" AND LENGTH(netsuite_clients_all.POD) = 14 
      GROUP BY netsuite_clients_all.POD 
      ORDER BY netsuite_clients_all.data_creazione DESC
    `);
        } catch (error) {
            this.logger.instance.notify(error, function (event) {
                event.addMetadata('pod-list-luce', { endpoint: 'pods@findByClient', method: 'GET' });
            });
            throw new BadRequestException(error.sqlMessage);
        }
    }

    findOne(podId: number) {
        return `This action returns a #${podId} pod`;
    }
}
