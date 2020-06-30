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

    @Get(':userId/stats')
    public async userStats(@Param('userId') userId: string) {
        const user = await this.userService.getUser(userId);

        if (user) {
            return user;
        }

        throw new NotFoundException();
    }

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

        return await this.urlService.createUrl(user, urlInput.url);
    }
}
