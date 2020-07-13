import { EntityRepository, Repository } from 'typeorm';

import { Url } from '@entities/url.entity';


@EntityRepository(Url)
export class UrlRepository extends Repository<Url> {}