import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('netsuite_iban')
export class NetsuiteIban {
    @PrimaryGeneratedColumn()
    id_interno?: string;
    @Column('varchar', { length: 100 })
    company_name?: string;
    @Column('varchar', { length: 100 })
    iban?: string;
    @Column('varchar', { length: 100 })
    societa_madre?: string;
    @Column('varchar', { length: 100 })
    first_concluded?: string;
    @Column('varchar', { length: 100 })
    ABI?: string;
    @Column('varchar', { length: 100 })
    CAB?: string;
    @Column('varchar', { length: 100 })
    sepa_id_mandato?: string;
    @Column('varchar', { length: 100 })
    status?: string;
}
