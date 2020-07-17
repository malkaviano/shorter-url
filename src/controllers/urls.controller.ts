import { Controller, Delete, Param, NotFoundException, Get, Redirect } from '@nestjs/common';

import { UrlService } from '@services/url.service';
import { UrlSingleOutput } from '@dtos/url-single.output';

@Controller('urls')
export class UrlsController {
    constructor(private readonly urlService: UrlService) { }

    @Delete(':id')
    public async deleteUrl(@Param('id') id: number): Promise<void> {
        const result = await this.urlService.deleteUrl(id);

        if (!result) {
            throw new NotFoundException();
        }
    }

    @Get(':id')
    @Redirect('https://nestjs.com', 301)
    public async accessUrl(@Param('id') id: number): Promise<UrlSingleOutput> {
        const result = await this.urlService.hitUrl(id);

        if (!result) {
            throw new NotFoundException();
        }

        return result;
    }
}
