import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('daniele_letture_dafour')
export class DanieleLettureDafour {
    @PrimaryGeneratedColumn()
    POD?: string;
    @Column('varchar', { length: 255 })
    source?: string;
    @Column('decimal', { precision: 6, scale: 4 })
    mmYYYY?: number;
    @Column('varchar', { length: 255 })
    Pot?: string;
    @Column('varchar', { length: 255 })
    nan_F1?: string;
    @Column('date')
    date_stop_F1?: string;
    @Column('int')
    F1?: number;
    @Column('date')
    date_start_F1?: string;
    @Column('int')
    zero_F1?: number;
    @Column('varchar', { length: 255 })
    nan_F2?: string;
    @Column('date')
    date_stop_F2?: string;
    @Column('int')
    F2?: number;
    @Column('date')
    date_start_F2?: string;
    @Column('int')
    zero_F2?: number;
    @Column('varchar', { length: 255 })
    nan_F3?: string;
    @Column('date')
    date_stop_F3?: string;
    @Column('int')
    F3?: number;
    @Column('date')
    date_start_F3?: string;
    @Column('int')
    zero_F3?: number;
    @Column('varchar', { length: 255 })
    nan_R1?: string;
    @Column('date')
    date_stop_R1?: string;
    @Column('int')
    R1?: number;
    @Column('date')
    date_start_R1?: string;
    @Column('int')
    zero_R1?: number;
    @Column('varchar', { length: 255 })
    nan_R2?: string;
    @Column('date')
    date_stop_R2?: string;
    @Column('int')
    R2?: number;
    @Column('date')
    date_start_R2?: string;
    @Column('int')
    zero_R2?: number;
    @Column('varchar', { length: 255 })
    nan_R3?: string;
    @Column('date')
    date_stop_R3?: string;
    @Column('int')
    R3?: number;
    @Column('date')
    date_start_R3?: string;
    @Column('int')
    zero_R3?: number;
    @Column('varchar', { length: 255 })
    nan_Pot?: string;
    @Column('decimal', { precision: 10, scale: 1 })
    P1?: number;
    @Column('decimal', { precision: 10, scale: 1 })
    P2?: number;
    @Column('decimal', { precision: 10, scale: 1 })
    P3?: number;
    @Column('varchar', { length: 255 })
    filename_1?: string;
    @Column('varchar', { length: 255 })
    filename_2?: string;
    @Column('datetime')
    insertdate?: string;
}
