import { Controller, Get, Param, NotFoundException, Post, Body, ConflictException } from '@nestjs/common';

import { UserService } from '@services/user.service';
import { UserInput } from '@dtos/user.input';
import { UrlInput as UrlInput } from '@dtos/url.input';
import { UrlService } from '@services/url.service';

@Controller('users')
export class UsersController {
    constructor(
        private readonly userService: UserService,
        private readonly urlService: UrlService,
    ) { }

    @Post()
    public async createUser(@Body() userInput: UserInput) {
        const user = await this.userService.createUser(userInput.userId);

        if (!user) {
            throw new ConflictException();
        }

        return user;
    }

    @Post(':userId/urls')
    public async addUrls(@Param('userId') userId: string, @Body() urlInput: UrlInput) {
        const user = await this.userService.getUser(userId);

        if (!user) {
            throw new NotFoundException();
        }

        return this.urlService.createUrl(user, urlInput.url);
    }

    @Get(':userId/stats')
    public async userStats(@Param('userId') userId: string) {
        const user = await this.userService.getUser(userId);

        if (!user) {
            throw new NotFoundException();
        }

        return this.urlService.getSummaryByUser(user);
    }
}
