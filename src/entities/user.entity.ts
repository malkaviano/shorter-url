import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

import { Url } from './url.entity'

@Entity()
export class User {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ length: '10' })
  userId: string;

  @OneToMany(type => Url, url => url.user)
  urls: Url[];
}