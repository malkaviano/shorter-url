import { Entity, PrimaryGeneratedColumn, Column, OneToMany, Index } from 'typeorm';

import { Url } from '@entities/url.entity'

@Entity()
export class User {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Index({ unique: true })
  @Column({ nullable: false, length: '10' })
  userId: string;

  @OneToMany(() => Url, url => url.user)
  urls: Url[];
}