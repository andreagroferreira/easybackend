import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('netsuite_clients_all')
export class NetsuiteClientsAll {
    @PrimaryGeneratedColumn()
    Cliente_Progetto__ID_interno?: number;
    @Column('varchar', { length: 100 })
    Cliente_Progetto__Nome_societa?: string;
    @Column('varchar', { length: 20 })
    POD?: string;
    @Column('int')
    ID_transazione?: number;
    @Column('varchar', { length: 100 })
    Indirizzo_fornitura?: string;
    @Column('varchar', { length: 100 })
    Citta?: string;
    @Column('varchar', { length: 10 })
    Provincia?: string;
    @Column('varchar', { length: 100 })
    Stato_fornitura?: string;
    @Column('varchar', { length: 255 })
    Cliente_Progetto__Numero_di_telefono?: string;
    @Column('varchar', { length: 255 })
    Cliente_Progetto__Telefono_alternativo?: string;
    @Column('varchar', { length: 255 })
    Cliente_Progetto__Telefono_cellulare?: string;
    @Column('varchar', { length: 100 })
    Cliente_Progetto___EVS__email_per_report?: string;
    @Column('varchar', { length: 100 })
    Cliente_Progetto__E_mail?: string;
    @Column('varchar', { length: 100 })
    Cliente_Progetto__E_mail_alternativa?: string;
    @Column('varchar', { length: 100 })
    Transaction_Number?: string;
    @Column('varchar', { length: 100 })
    Macro_Topology?: string;
    @Column('varchar', { length: 100 })
    Fotovoltaico_in_autoconsumo?: string;
    @Column('varchar', { length: 100 })
    Potenza_FV?: number;
    @Column('varchar', { length: 20 })
    Potenza_disponibile?: number;
    @Column('varchar', { length: 250 })
    Partner_Nome?: string;
    @Column('varchar', { length: 250 })
    Partner_INATTIVO?: string;
    @Column('varchar', { length: 250 })
    Cliente_moroso?: string;
    @Column('varchar', { length: 250 })
    ENERGY_E_GENIUS?: string;
    @Column('varchar', { length: 250 })
    Motivo_Win_Loss?: string;
    @Column('date')
    data_creazione?: string;
    @Column('varchar', { length: 50 })
    Numero_documento?: string;
    @Column('varchar', { length: 255 })
    fasce_contratto?: string;
    @Column('varchar', { length: 255 })
    tipo_contratto?: string;
    @Column('text')
    notes?: string;
    @Column('varchar', { length: 255 })
    codice_fiscale?: string;
    @Column('varchar', { length: 255 })
    name_without_points?: string;
    @Column('varchar', { length: 20 })
    Cap_fornitura?: number;
    @Column('varchar', { length: 100 })
    Citta_sede_legale?: string;
    @Column('varchar', { length: 255 })
    Indirizzo_sede_legale?: string;
    @Column('varchar', { length: 100 })
    Provincia_sede_legale?: string;
    @Column('varchar', { length: 20 })
    cap_sede_legale?: string;
    @Column('char')
    Cliente_domestico?: string;
    @Column('float')
    lat?: number;
    @Column('float')
    lng?: number;
    @Column('varchar', { length: 255 })
    place_id?: number;
    @Column('varchar', { length: 255 })
    location_type?: string;
    @Column('varchar', { length: 255 })
    request?: string;
    @Column('text')
    full_text_search?: string;
    @Column('varchar', { length: 20 })
    data_inizio_fornitura?: string;
    @Column('varchar', { length: 20 })
    data_rimozione_sensori?: string;
    @Column('varchar', { length: 20 })
    Numero_IVA?: number;
    @Column('varchar', { length: 255 })
    partner_email?: string;
    @Column('varchar', { length: 255 })
    partner_telefono?: string;
    @Column('tinyint')
    dummysensor?: string;
}
