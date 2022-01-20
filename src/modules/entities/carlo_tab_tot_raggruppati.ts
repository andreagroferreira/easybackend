import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('carlo_tab_tot_raggruppati')
export class CarloTabTotRaggruppati {
    @PrimaryGeneratedColumn()
    POD?: string;
    @Column('datetime')
    timestamp?: Date;
    @Column('float')
    ENEL?: number;
    @Column('float')
    VOLTAIDE?: number;
    @Column('float')
    FLUKSO?: number;
    @Column('float')
    FLUKSO_FV?: number;
    @Column('float')
    FORECAST?: number;
    @Column('datetime')
    insertdate?: Date;
    @Column('float')
    dataorigin?: number;
    @Column('varchar', { length: 255 })
    section_parent_POD?: string;
}
