import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('webapp_pdfs_clients')
export class WebappPdfsClients {
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
    @Column('int')
    Client_ID?: number;
    @Column('varchar', { length: 255 })
    type?: string;
    @Column('varchar', { length: 255 })
    aws_key?: string;
    @Column('tinyint')
    duplicated?: boolean;
}
