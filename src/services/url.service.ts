import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { UrlRepository } from '../repositories/url.repository';
import { Url } from '../entities/url.entity';
import { User } from '../entities/user.entity';
import { UrlOutput } from '../dtos/url.output';
import { Summary } from '../dtos/summary.output';

@Injectable()
export class UrlService {
    constructor(@InjectRepository(UrlRepository) private readonly repository: UrlRepository) { }

    public async createUrl(user: User, url: string, shortUrl: string): Promise<UrlOutput> {
        const result = await this.repository.save(Object.assign(
            new Url(),
            {
                user,
                url,
                shortUrl,
                hits: 0,
            },
        ));

        delete result.user;

        return result;
    }

    public async getSummaryByUser(user: User, limit: number = 10): Promise<Summary> {
        const urls = await this.repository.createQueryBuilder('url')
                                    .where('"userId" = :id')
                                    .orderBy('url.hits', "DESC")
                                    .take(limit)
                                    .setParameters({ id: user.id })
                                    .getMany();

        const r = await this.repository.createQueryBuilder('url')
                                    .select('COALESCE(SUM(hits), 0)', "hits")
                                    .addSelect('COUNT(*)', "urlCount")
                                    .where('"userId" = :id')
                                    .setParameters({ id: user.id })
                                    .getRawOne();

        return Object.assign(r, { topUrls: urls });
    }

    public async getUrl(id: number): Promise<Url> {
        return await this.repository.findOne(id);
    }

    public async deleteUrl(id: number): Promise<boolean> {
        const url = this.getUrl(id);

        if (url) {
            await this.repository.delete(id);

            return true;
        }

        return false;
    }

    public async getSummary(limit: number = 10): Promise<Summary> {
        const urls = await this.repository.createQueryBuilder('url')
                                    .orderBy('url.hits', "DESC")
                                    .take(limit)
                                    .getMany();

        const r = await this.repository.createQueryBuilder('url')
                                    .select('COALESCE(SUM(hits), 0)', "hits")
                                    .addSelect('COUNT(*)', "urlCount")
                                    .getRawOne();

        return Object.assign(r, { topUrls: urls });
    }
}
