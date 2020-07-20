import { Injectable } from '@nestjs/common';

import { Url } from '@entities/url.entity';
import { User } from '@entities/user.entity';
import { UrlOutput } from '@dtos/url.output';
import { SummaryOutput } from '@dtos/summary.output';
import { RepositoryService } from '@services/repository.service';
import { UrlSingleOutput } from '@dtos/url-single.output';
import { ShortenerService } from '@services/shortener.service';

@Injectable()
export class UrlService {
    constructor(
        private readonly repository: RepositoryService,
        private readonly shortner: ShortenerService,
    ) { }

    public async createUrl(user: User, url: string): Promise<UrlOutput> {
        const obj: Url = {
            id: 0,
            user,
            url,
            shortUrl: null,
            hits: 0,
        };

        let result = null;

        while (!result) {
            obj.shortUrl = `https://xpto.com/${this.shortner.generateSegment()}`;

            result = await this.repository.saveUrl(obj);
        }

        return result;
    }

    public async getSummaryByUser(user: User, limit = 10): Promise<SummaryOutput | Error> {
        try {
            const { topUrls, hits, urlCount } = await this.repository.userSummary(user.id, limit);

            return {
                userId: user.userId,
                hits,
                urlCount,
                topUrls
            };
        } catch (error) {
            return Error(error);
        }
    }

    public async getUrl(id: number): Promise<Url> {
        try {
            return await this.repository.getUrl(id);
        } catch (error) {
            return null;
        }
    }

    public async hitUrl(id: number): Promise<UrlSingleOutput> {
        const url = await this.repository.getUrl(id);

        if (!url) {
            return null;
        }

        url.hits += 1;

        await this.repository.saveUrl(url);

        return { url: url.url };
    }

    public async deleteUrl(id: number): Promise<boolean> {
        const url = await this.getUrl(id);

        if (!url) {
            return false;
        }

        return this.repository.deleteUrl(id);
    }

    public getSummary(limit = 10): Promise<SummaryOutput> {
        return this.repository.urlSummary(limit);
    }
}
