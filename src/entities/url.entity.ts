import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

import { User } from './user.entity'

@Entity()
export class Url {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number;

    @Column({ length: '250' })
    url: string;

    @Column({ length: '20' })
    shortUrl: string;

    @Column()
    hits: number;

    @ManyToOne(type => User, user => user.urls)
    user: User;
}