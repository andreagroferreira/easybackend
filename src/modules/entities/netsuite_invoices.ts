import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('netsuite_invoices')
export class NetsuiteInvoices {
    @PrimaryGeneratedColumn()
    Numero?: string;
    @Column('varchar', { length: 20 })
    Data?: string;
    @Column('varchar', { length: 10 })
    Importo?: string;
    @Column('varchar', { length: 100 })
    NomeFile?: string;
    @Column('varchar', { length: 20 })
    NumeroSIM?: string;
    @Column('varchar', { length: 250 })
    Tipologia_servizi?: string;
    @Column('varchar', { length: 20 })
    Stima_consumo?: string;
    @Column('varchar', { length: 200 })
    Indirizzo?: string;
    @Column('varchar', { length: 20 })
    ID_Interno?: string;
    @Column('varchar', { length: 50 })
    ID?: string;
    @Column('varchar', { length: 200 })
    Cliente_nome?: string;
    @Column('varchar', { length: 200 })
    Stato_base?: string;
    @Column('varchar', { length: 200 })
    internal_ID?: string;
}
