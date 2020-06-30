import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { UrlRepository } from '../repositories/url.repository';
import { Url } from '../entities/url.entity';
import { User } from '../entities/user.entity';
import { UrlOutput } from '../dtos/url.output';

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
}
