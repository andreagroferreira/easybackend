import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('paolo_storico_allerte')
export class PaoloStoricoAllerte {
    @PrimaryGeneratedColumn()
    id?: number;
    @Column('varchar', { length: 255 })
    POD?: string;
    @Column('varchar', { length: 255 })
    Client_name?: string;
    @Column('date')
    Alert_date?: Date;
    @Column('varchar', { length: 255 })
    Alert_type?: string;
    @Column('varchar', { length: 255 })
    Alert_subtype?: string;
    @Column('decimal', { precision: 10, scale: 2 })
    Alert_value?: number;
    @Column('varchar', { length: 255 })
    Address?: string;
    @Column('varchar', { length: 255 })
    City?: string;
    @Column('float')
    SMS?: number;
    @Column('varchar', { length: 255 })
    SMS_number?: string;
    @Column('varchar', { length: 255 })
    SMS_ID?: string;
    @Column('float')
    MAIL?: number;
    @Column('text')
    MAIL_address?: string;
    @Column('varchar', { length: 255 })
    Extra_infos_text?: string;
    @Column('varchar', { length: 255 })
    version_text?: string;
}
