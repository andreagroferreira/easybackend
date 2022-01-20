import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('netsuite_salesorders')
export class NetsuiteSalesorders {
    @PrimaryGeneratedColumn()
    POD?: string;
    @Column('int')
    nr_salesorder?: number;
    @Column('varchar', { length: 255 })
    id_opportunity?: string;
    @Column('int')
    id_cliente?: number;
    @Column('varchar', { length: 255 })
    nome_cliente?: string;
    @Column('varchar', { length: 100 })
    date_salesorder?: string;
    @Column('varchar', { length: 100 })
    date_inizio_fornitura?: string;
    @Column('varchar', { length: 100 })
    date_fine_contratto?: string;
    @Column('varchar', { length: 255 })
    motivo_salesorder?: string;
    @Column('varchar', { length: 255 })
    tipologia_contratto?: string;
    @Column('varchar', { length: 100 })
    data_inizio_rinnovabile?: string;
}
