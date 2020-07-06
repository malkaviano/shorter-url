import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { UserRepository } from '../repositories/user.repository';
import { UrlRepository } from '../repositories/url.repository';
import { Url } from '../entities/url.entity';
import { User } from '../entities/user.entity';
import { SummaryOutput } from '../dtos/summary.output';
import { UserIdOutput } from '../dtos/user-id.output';
import { UrlOutput } from '../dtos/url.output';

@Injectable()
export class RepositoryService {
    constructor(
        @InjectRepository(UserRepository) private readonly userRepository: UserRepository,
        @InjectRepository(UrlRepository) private readonly urlRepository: UrlRepository
    ) { }

    public async saveUrl(url: Url): Promise<UrlOutput> {
        try {
            const result = await this.urlRepository.save(url);

            delete result.user;

            return result;
        } catch (error) {
            return null;
        }
    }

    public async userSummary(id: number, limit: number): Promise<SummaryOutput> {
        const urls = await this.urlRepository.createQueryBuilder('url')
            .where('"userId" = :id')
            .orderBy('url.hits', "DESC")
            .take(limit)
            .setParameters({ id })
            .getMany();

        const r = await this.urlRepository.createQueryBuilder('url')
            .select('COALESCE(SUM(hits), 0)', "hits")
            .addSelect('COUNT(*)', "urlCount")
            .where('"userId" = :id')
            .setParameters({ id })
            .getRawOne();

        return Object.assign(r, { topUrls: urls, userId: null });
    }

    public async urlSummary(limit: number): Promise<SummaryOutput> {
        const urls = await this.urlRepository.createQueryBuilder('url')
            .orderBy('url.hits', "DESC")
            .take(limit)
            .getMany();

        const r = await this.urlRepository.createQueryBuilder('url')
            .select('COALESCE(SUM(hits), 0)', "hits")
            .addSelect('COUNT(*)', "urlCount")
            .getRawOne();

        return Object.assign(r, { topUrls: urls });
    }

    public getUrl(id: number): Promise<Url> {
        return this.urlRepository.findOne(id);
    }

    public async deleteUrl(id: number): Promise<boolean> {
        try {
            await this.urlRepository.delete(id);

            return Promise.resolve(true);
        } catch (error) {
            return Promise.resolve(false);
        }
    }

    public findUser(userId: string): Promise<User> {
        return this.userRepository.findOne({ userId });
    }

    public async deleteUser(userId: string): Promise<boolean> {
        try {
            await this.userRepository.delete({ userId });

            return true;
        } catch (error) {
            return false;
        }

    }

    public async createUser(userId: string): Promise<UserIdOutput> {
        try {
            const result = await this.userRepository.save({ userId });

            return { userId: result.userId };
        } catch (error) {
            return null;
        }

    }
}
