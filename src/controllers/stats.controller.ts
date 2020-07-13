import { Controller, Get, Param, NotFoundException } from '@nestjs/common';

import { UrlService } from '@services/url.service';
import { Url } from '@entities/url.entity';

@Controller('stats')
export class StatsController {
    constructor(private readonly urlService: UrlService) { }

    @Get(':id')
    public async getUrlStats(@Param('id') id: number): Promise<Url> {
        const url = await this.urlService.getUrl(id);

        if (!url) {
            throw new NotFoundException();
        }

        return url;
    }

    @Get()
    public async getStats() {
        return this.urlService.getSummary();
    }
}
