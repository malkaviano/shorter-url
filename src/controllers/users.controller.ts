import { Controller, Get, Param, NotFoundException, Post, Body, ConflictException } from '@nestjs/common';

import { UserService } from '../services/user.service';
import { UserInput } from '../dtos/user.input';
import { UrlInput as UrlInput } from '../dtos/url.input';
import { UrlService } from '../services/url.service';

@Controller('users')
export class UsersController {
    constructor(
        private readonly userService: UserService,
        private readonly urlService: UrlService,
    ) { }

    @Post()
    public async createUser(@Body() userInput: UserInput) {
        try {
            return await this.userService.createUser(userInput.userId);
        } catch (error) {
            throw new ConflictException();
        }
    }

    @Post(':userId/urls')
    public async addUrls(@Param('userId') userId: string, @Body() urlInput: UrlInput) {
        const user = await this.userService.getUser(userId);
        const shortUrl = 'abcdefgh';

        if (user) {
            return await this.urlService.createUrl(user, urlInput.url, shortUrl);
        }

        throw new NotFoundException();
    }

    @Get(':userId/stats')
    public async userStats(@Param('userId') userId: string) {
        const user = await this.userService.getUser(userId);

        if (!user) {
            throw new NotFoundException();
        }

        const { topUrls, hits, urlCount } = await this.urlService.getSummaryByUser(user);

        return {
            userId,
            hits,
            urlCount,
            topUrls
        };
    }
}
