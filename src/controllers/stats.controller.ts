import { Controller, Get, Param, NotFoundException } from '@nestjs/common';

import { UrlService } from '../services/url.service';

@Controller('stats')
export class StatsController {
    constructor(private readonly urlService: UrlService) { }

    @Get(':id')
    public async getStats(@Param('id') id: number) {
        const url = await this.urlService.getUrl(id);

        if (!url) {
            throw new NotFoundException();
        }

        return url;
    }
}
