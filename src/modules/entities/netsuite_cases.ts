import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('netsuite_cases')
export class NetsuiteCases {
    @PrimaryGeneratedColumn()
    Numero?: number;
    @Column('text')
    Problema_caso?: string;
    @Column('text')
    Societa_nome?: string;
    @Column('text')
    Oggetto?: string;
    @Column('varchar', { length: 100 })
    Assegnato_a?: string;
    @Column('varchar', { length: 20 })
    Data_incidente?: string;
    @Column('varchar', { length: 100 })
    Tipo?: string;
    @Column('text')
    Contatto?: string;
    @Column('varchar', { length: 30 })
    Stato?: string;
    @Column('varchar', { length: 100 })
    Societa_ID?: string;
    @Column('varchar', { length: 30 })
    Societa_ID_interno?: string;
    @Column('varchar', { length: 255 })
    internal_ID?: string;
}
