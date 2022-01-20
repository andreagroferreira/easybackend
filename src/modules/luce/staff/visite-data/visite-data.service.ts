import { BadRequestException, Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';
import { BugsnagService } from '@nkaurelien/nest-bugsnag';

@Injectable()
export class VisiteDataService {
    constructor(private readonly connection: Connection, private readonly logger: BugsnagService) {}
    async getVisiteData(podId: string) {
        try {
            return await this.connection
                .query(`Select PDF,concat((@row_number:=@row_number + 1),"_Visite_",Cliente_Progetto__Nome_societa) as Data from (SELECT
    path,
    size,
    aws_key AS PDF,
  Cliente_Progetto__Nome_societa,
    created
  FROM  eviso_new.webapp_pdfs_visite b
  join (SELECT pod, Cliente_Progetto__Nome_societa from eviso_new.netsuite_clients_all WHERE Cliente_Progetto__ID_interno = (select Cliente_Progetto__ID_interno from eviso_new.netsuite_clients_all WHERE POD ="${podId}" LIMIT 1)) a on b.path like concat("%",a.pod,"%") AND length(a.pod) = 14
   GROUP by size  ORDER BY created ASC) d, (SELECT @row_number:=0) as t group by Data order by Data DESC`);
        } catch (error) {
            this.logger.instance.notify(error, function (event) {
                event.addMetadata('VisiteDataService', { endpoint: 'visite-data@getVisiteData', method: 'GET' });
            });
            throw new BadRequestException(error.sqlMessage);
        }
    }
}
