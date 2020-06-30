import { Controller, Delete, Param, NotFoundException, Get, Redirect } from '@nestjs/common';

import { UrlService } from '../services/url.service';

@Controller('urls')
export class UrlsController {
    constructor(private readonly urlService: UrlService) { }

    @Delete(':id')
    public async deleteUrl(@Param('id') id: number) {
        const url = await this.urlService.getUrl(id);

        if (!url) {
            throw new NotFoundException();
        }

        await this.urlService.deleteUrl(id);
    }

    @Get(':id')
    @Redirect('https://nestjs.com', 301)
    public async accessUrl(@Param('id') id: number) {
        const url = await this.urlService.getUrl(id);

        if(url) {
            return { url: url.url };
        }

        throw new NotFoundException();
    }
}
