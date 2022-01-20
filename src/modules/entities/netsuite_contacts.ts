import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('netsuite_contacts')
export class NetsuiteContacts {
    @PrimaryGeneratedColumn()
    internalId?: string;
    @Column('varchar', { length: 250 })
    altEmail?: string;
    @Column('varchar', { length: 250 })
    comments?: string;
    @Column('varchar', { length: 250 })
    company?: string;
    @Column('varchar', { length: 250 })
    Company_ID?: string;
    @Column('varchar', { length: 250 })
    contactSource?: string;
    @Column('datetime')
    dateCreated?: Date;
    @Column('varchar', { length: 250 })
    defaultAddress?: string;
    @Column('varchar', { length: 250 })
    email?: string;
    @Column('varchar', { length: 250 })
    entityId?: string;
    @Column('varchar', { length: 250 })
    fax?: string;
    @Column('varchar', { length: 250 })
    firstName?: string;
    @Column('varchar', { length: 250 })
    globalSubscriptionStatus?: string;
    @Column('varchar', { length: 250 })
    homePhone?: string;
    @Column('bit')
    isInactive?: boolean;
    @Column('varchar', { length: 250 })
    lastModifiedDate?: string;
    @Column('varchar', { length: 250 })
    lastName?: string;
    @Column('varchar', { length: 250 })
    middleName?: string;
    @Column('varchar', { length: 250 })
    mobilePhone?: string;
    @Column('varchar', { length: 250 })
    officePhone?: string;
    @Column('varchar', { length: 250 })
    phone?: string;
    @Column('varchar', { length: 250 })
    salutation?: string;
    @Column('varchar', { length: 250 })
    supervisor?: string;
    @Column('varchar', { length: 250 })
    supervisorPhone?: string;
    @Column('varchar', { length: 250 })
    title?: string;
}
