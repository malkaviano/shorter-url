import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, Index } from 'typeorm';

import { User } from './user.entity'

@Entity()
export class Url {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number;

    @Column({ nullable: false, length: '250' })
    url: string;

    @Index({ unique: true })
    @Column({ nullable: false, length: '50' })
    shortUrl: string;

    @Column({ nullable: false })
    hits: number;

    @ManyToOne(type => User, user => user.urls, { nullable: false, onDelete:'CASCADE' })
    user: User;
}