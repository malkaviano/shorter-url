import { Controller, Delete, Param, NotFoundException } from '@nestjs/common';

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
}
