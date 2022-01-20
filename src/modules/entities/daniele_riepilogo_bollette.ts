import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('daniele_riepilogo_bollette')
export class danieleRiepilogoBollette {
    @PrimaryGeneratedColumn()
    POD?: string;
    @Column('text')
    nome?: string;
    @Column('text')
    codice_fiscale?: string;
    @Column('text')
    p_iva?: string;
    @Column('varchar', { length: 255 })
    n_ftt?: string;
    @Column('date')
    emissione?: string;
    @Column('varchar', { length: 255 })
    scadenza?: string;
    @Column('date')
    per_rif_in?: string;
    @Column('date')
    per_rif_fine?: string;
    @Column('decimal', { precision: 10, scale: 3 })
    morosita?: number;
    @Column('text')
    tipo_ftt?: string;
    @Column('text')
    origine_dati?: string;
    @Column('text')
    uso?: string;
    @Column('decimal', { precision: 65, scale: 30 })
    iva_percent?: number;
    @Column('decimal', { precision: 65, scale: 30 })
    tensione?: number;
    @Column('decimal', { precision: 65, scale: 30 })
    E_annua?: number;
    @Column('float')
    null_17?: number;
    @Column('decimal', { precision: 65, scale: 30 })
    E_att_F1?: number;
    @Column('decimal', { precision: 65, scale: 30 })
    E_att_F2?: number;
    @Column('decimal', { precision: 65, scale: 30 })
    E_att_F3?: number;
    @Column('int')
    E_att_fatturata?: number;
    @Column('float')
    null_22?: number;
    @Column('decimal', { precision: 65, scale: 30 })
    E_rea_F1?: number;
    @Column('decimal', { precision: 65, scale: 30 })
    E_rea_F2?: number;
    @Column('decimal', { precision: 65, scale: 30 })
    E_rea_F3?: number;
    @Column('decimal', { precision: 65, scale: 30 })
    E_rea_fatturata?: number;
    @Column('float')
    null_27?: number;
    @Column('decimal', { precision: 65, scale: 30 })
    P_disp?: number;
    @Column('decimal', { precision: 65, scale: 30 })
    P_fatturata?: number;
    @Column('float')
    null_30?: number;
    @Column('decimal', { precision: 65, scale: 30 })
    imponibile_TOT?: number;
    @Column('decimal', { precision: 65, scale: 30 })
    iva?: number;
    @Column('decimal', { precision: 65, scale: 30 })
    bollo?: number;
    @Column('decimal', { precision: 65, scale: 30 })
    servizi_vendita_TOT?: number;
    @Column('decimal', { precision: 65, scale: 30 })
    servizi_rete_TOT?: number;
    @Column('decimal', { precision: 65, scale: 30 })
    accise_TOT?: number;
    @Column('float')
    null_37?: number;
    @Column('decimal', { precision: 65, scale: 30 })
    quota_E_evs_F1?: number;
    @Column('decimal', { precision: 65, scale: 30 })
    quota_E_evs_F1_perdite?: number;
    @Column('decimal', { precision: 65, scale: 30 })
    quota_E_evs_F2?: number;
    @Column('decimal', { precision: 65, scale: 30 })
    quota_E_evs_F2_perdite?: number;
    @Column('decimal', { precision: 65, scale: 30 })
    quota_E_evs_F3?: number;
    @Column('decimal', { precision: 65, scale: 30 })
    quota_E_evs_F3_perdite?: number;
    @Column('decimal', { precision: 65, scale: 30 })
    quota_fissa_evs?: number;
    @Column('decimal', { precision: 65, scale: 30 })
    sconto_evs?: number;
    @Column('decimal', { precision: 65, scale: 30 })
    bolletta_cartacea?: number;
    @Column('float')
    null_47?: number;
    @Column('decimal', { precision: 65, scale: 30 })
    quota_E_disp?: number;
    @Column('decimal', { precision: 65, scale: 30 })
    quota_E_disp_perdite?: number;
    @Column('decimal', { precision: 65, scale: 30 })
    quota_P_disp?: number;
    @Column('decimal', { precision: 65, scale: 30 })
    quota_fissa_disp?: number;
    @Column('float')
    null_52?: number;
    @Column('decimal', { precision: 65, scale: 30 })
    quota_E_DISPbt?: number;
    @Column('decimal', { precision: 65, scale: 30 })
    quota_P_DISPbt?: number;
    @Column('decimal', { precision: 65, scale: 30 })
    quota_fissa_DISPbt?: number;
    @Column('float')
    null_56?: number;
    @Column('decimal', { precision: 65, scale: 30 })
    penale_rea_50_75?: number;
    @Column('decimal', { precision: 65, scale: 30 })
    penale_rea_75?: number;
    @Column('float')
    null_59?: number;
    @Column('decimal', { precision: 65, scale: 30 })
    quota_E_tras_dis_mis?: number;
    @Column('decimal', { precision: 65, scale: 30 })
    quota_P_tras_dis_mis?: number;
    @Column('decimal', { precision: 65, scale: 30 })
    quota_fissa_tras_dis_mis?: number;
    @Column('float')
    null_63?: number;
    @Column('decimal', { precision: 65, scale: 30 })
    quota_E_tras?: number;
    @Column('decimal', { precision: 65, scale: 30 })
    quota_P_tras?: number;
    @Column('decimal', { precision: 65, scale: 30 })
    quota_fissa_tras?: number;
    @Column('float')
    null_67?: number;
    @Column('decimal', { precision: 65, scale: 30 })
    quota_E_dis?: number;
    @Column('decimal', { precision: 65, scale: 30 })
    quota_P_dis?: number;
    @Column('decimal', { precision: 65, scale: 30 })
    quota_fissa_dis?: number;
    @Column('float')
    null_71?: number;
    @Column('decimal', { precision: 65, scale: 30 })
    quota_E_mis?: number;
    @Column('decimal', { precision: 65, scale: 30 })
    quota_P_mis?: number;
    @Column('decimal', { precision: 65, scale: 30 })
    quota_fissa_mis?: number;
    @Column('float')
    null_75?: number;
    @Column('decimal', { precision: 65, scale: 30 })
    quota_E_ongen?: number;
    @Column('decimal', { precision: 65, scale: 30 })
    quota_P_ongen?: number;
    @Column('decimal', { precision: 65, scale: 30 })
    quota_fissa_ongen?: number;
    @Column('float')
    null_79?: number;
    @Column('decimal', { precision: 65, scale: 30 })
    imposta_erariale?: number;
    @Column('decimal', { precision: 65, scale: 30 })
    null_81?: number;
    @Column('decimal', { precision: 65, scale: 30 })
    iva_TOT?: number;
    @Column('decimal', { precision: 65, scale: 30 })
    bollo_TOT?: number;
    @Column('float')
    null_84?: number;
    @Column('decimal', { precision: 65, scale: 30 })
    perdite_percent?: number;
    @Column('decimal', { precision: 65, scale: 30 })
    rea50_75_ceuro_kvarh?: number;
    @Column('decimal', { precision: 65, scale: 30 })
    rea75_ceuro_kvarh?: number;
    @Column('decimal', { precision: 65, scale: 30 })
    TISart25_ceuro_kWh?: number;
    @Column('decimal', { precision: 65, scale: 30 })
    TISart25_ceuro_POD_yy?: number;
    @Column('decimal', { precision: 65, scale: 30 })
    '11106art44_ceuro_kWh'?: number;
    @Column('decimal', { precision: 65, scale: 30 })
    '11106art44bis_ceuro_kWh'?: number;
    @Column('decimal', { precision: 65, scale: 30 })
    '11106art45_ceuro_kWh'?: number;
    @Column('decimal', { precision: 65, scale: 30 })
    '11106art46_ceuro_kWh'?: number;
    @Column('decimal', { precision: 65, scale: 30 })
    '11106art48_ceuro_kWh'?: number;
    @Column('decimal', { precision: 65, scale: 30 })
    '11106art73_ceuro_kWh'?: number;
    @Column('decimal', { precision: 65, scale: 30 })
    'TISart25bis_ceuro_kWh'?: number;
    @Column('decimal', { precision: 65, scale: 30 })
    'TISart15_ceuro_POD_yy'?: number;
    @Column('decimal', { precision: 65, scale: 30 })
    'TISart24bis_ceuro_POD_yy'?: number;
    @Column('decimal', { precision: 65, scale: 30 })
    '11106art40_ceuro_kWh'?: number;
    @Column('decimal', { precision: 65, scale: 30 })
    tau3_ceuro_kWh?: number;
    @Column('decimal', { precision: 65, scale: 30 })
    tau2_ceuro_kW_yy?: number;
    @Column('decimal', { precision: 65, scale: 30 })
    tau1_ceuro_POD_yy?: number;
    @Column('decimal', { precision: 65, scale: 30 })
    TRASe_ceuro_kWh?: number;
    @Column('decimal', { precision: 65, scale: 30 })
    TRASp_ceuro_kW_yy?: number;
    @Column('decimal', { precision: 65, scale: 30 })
    qe_dis_ceuro_kWh?: number;
    @Column('decimal', { precision: 65, scale: 30 })
    qp_dis_ceuro_kW_yy?: number;
    @Column('decimal', { precision: 65, scale: 30 })
    qf_dis_ceuro_POD_yy?: number;
    @Column('decimal', { precision: 65, scale: 30 })
    MIS3_ceuro_kWh?: number;
    @Column('decimal', { precision: 65, scale: 30 })
    MIS1_ceuro_POD_yy?: number;
    @Column('decimal', { precision: 65, scale: 30 })
    A2_ceuro_kWh?: number;
    @Column('decimal', { precision: 65, scale: 30 })
    A3_ceuro_kWh?: number;
    @Column('decimal', { precision: 65, scale: 30 })
    A4_ceuro_kWh?: number;
    @Column('decimal', { precision: 65, scale: 30 })
    A5_ceuro_kWh?: number;
    @Column('decimal', { precision: 65, scale: 30 })
    AS_ceuro_kWh?: number;
    @Column('decimal', { precision: 65, scale: 30 })
    A6_ceuro_kWh?: number;
    @Column('decimal', { precision: 65, scale: 30 })
    UC3_ceuro_kWh?: number;
    @Column('decimal', { precision: 65, scale: 30 })
    UC4_ceuro_kWh?: number;
    @Column('decimal', { precision: 65, scale: 30 })
    UC6_ceuro_kWh?: number;
    @Column('decimal', { precision: 65, scale: 30 })
    UC7_ceuro_kWh?: number;
    @Column('decimal', { precision: 65, scale: 30 })
    MCT_ceuro_kWh?: number;
    @Column('decimal', { precision: 65, scale: 30 })
    AE_ceuro_kWh?: number;
    @Column('decimal', { precision: 65, scale: 30 })
    A6_ceuro_kW_yy?: number;
    @Column('decimal', { precision: 65, scale: 30 })
    UC6_ceuro_kW_yy?: number;
    @Column('decimal', { precision: 65, scale: 30 })
    A2_ceuro_POD_yy?: number;
    @Column('decimal', { precision: 65, scale: 30 })
    A3_ceuro_POD_yy?: number;
    @Column('decimal', { precision: 65, scale: 30 })
    A4_ceuro_POD_yy?: number;
    @Column('decimal', { precision: 65, scale: 30 })
    A5_ceuro_POD_yy?: number;
    @Column('decimal', { precision: 65, scale: 30 })
    AS_ceuro_POD_yy?: number;
    @Column('decimal', { precision: 65, scale: 30 })
    A6_ceuro_POD_yy?: number;
    @Column('decimal', { precision: 65, scale: 30 })
    UC3_ceuro_POD_yy?: number;
    @Column('decimal', { precision: 65, scale: 30 })
    UC4_ceuro_POD_yy?: number;
    @Column('decimal', { precision: 65, scale: 30 })
    UC6_ceuro_POD_yy?: number;
    @Column('decimal', { precision: 65, scale: 30 })
    UC7_ceuro_POD_yy?: number;
    @Column('decimal', { precision: 65, scale: 30 })
    MCT_ceuro_POD_yy?: number;
    @Column('decimal', { precision: 65, scale: 30 })
    AE_ceuro_POD_yy?: number;
    @Column('decimal', { precision: 65, scale: 30 })
    ASOS_ceuro_kWh?: number;
    @Column('decimal', { precision: 65, scale: 30 })
    ASOS_ceuro_kW_yy?: number;
    @Column('decimal', { precision: 65, scale: 30 })
    ASOS_ceuro_POD_yy?: number;
    @Column('decimal', { precision: 65, scale: 30 })
    ARIM_ceuro_kWh?: number;
    @Column('decimal', { precision: 65, scale: 30 })
    ARIM_ceuro_kW_yy?: number;
    @Column('decimal', { precision: 65, scale: 30 })
    ARIM_ceuro_POD_yy?: number;
    @Column('varchar', { length: 30 })
    classe?: string;
    @Column('decimal', { precision: 65, scale: 30 })
    accise_euro_kWh?: number;
    @Column('float')
    null_136?: number;
    @Column('text')
    note?: string;
    @Column('float')
    null_138?: number;
    @Column('decimal', { precision: 65, scale: 30 })
    accise_quantita_kWh?: number;
    @Column('float')
    null_140?: number;
    @Column('text')
    num_contratto?: string;
    @Column('text')
    data_in_fornitura?: string;
    @Column('text')
    nome_contratto?: string;
    @Column('text')
    chi_paga?: string;
    @Column('text')
    forma_pagamento?: string;
    @Column('text')
    moroso?: string;
    @Column('decimal', { precision: 65, scale: 30 })
    chi_paga_Idinterno?: string;
    @Column('decimal', { precision: 65, scale: 30 })
    Idinterno?: string;
    @Column('decimal', { precision: 65, scale: 30 })
    acconto_bolletta?: number;
    @Column('float')
    null_150?: number;
    @Column('decimal', { precision: 65, scale: 30 })
    E_att_giafatturato?: number;
    @Column('decimal', { precision: 65, scale: 30 })
    E_rea_giafatturato?: number;
    @Column('decimal', { precision: 65, scale: 30 })
    P_giafatturato?: number;
    @Column('decimal', { precision: 65, scale: 30 })
    numerobollettaprecedente?: number;
    @Column('decimal', { precision: 65, scale: 30 })
    quota_E_gestione_tras?: number;
    @Column('decimal', { precision: 65, scale: 30 })
    quota_P_gestione_tras?: number;
    @Column('decimal', { precision: 65, scale: 30 })
    quota_fissa_gestione_tras?: number;
    @Column('decimal', { precision: 65, scale: 30 })
    quota_E_onsist?: number;
    @Column('decimal', { precision: 65, scale: 30 })
    quota_P_onsist?: number;
    @Column('decimal', { precision: 65, scale: 30 })
    quota_fissa_onsist?: number;
    @Column('varchar', { length: 255 })
    nomefile?: string;
    @Column('datetime')
    insertdate?: string;
    @Column('varchar', { length: 255 })
    n_nota_credito?: string;
    @Column('datetime')
    data_nota_credito?: string;
}
