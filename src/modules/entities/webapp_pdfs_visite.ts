import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('webapp_pdfs_visite')
export class WebappPdfsVisite {
    @PrimaryGeneratedColumn()
    POD?: string;
    @Column('varchar', { length: 255 })
    filename?: string;
    @Column('varchar', { length: 255 })
    path?: string;
    @Column('varchar', { length: 255 })
    directory?: string;
    @Column('bigint')
    size?: number;
    @Column('datetime')
    created?: Date;
    @Column('datetime')
    aws_synced?: Date;
    @Column('varchar', { length: 255 })
    aws_key?: string;
    @Column('varchar', { length: 255 })
    duplicated?: string;
}
