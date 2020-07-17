import { Controller, Get, Param, NotFoundException, Post, Body, ConflictException, InternalServerErrorException } from '@nestjs/common';

import { UserService } from '@services/user.service';
import { UserInput } from '@dtos/user.input';
import { UrlInput as UrlInput } from '@dtos/url.input';
import { UrlService } from '@services/url.service';
import { UserIdOutput } from '@dtos/user-id.output';
import { UrlOutput } from '@dtos/url.output';
import { SummaryOutput } from '@dtos/summary.output';

@Controller('users')
export class UsersController {
    constructor(
        private readonly userService: UserService,
        private readonly urlService: UrlService,
    ) { }

    @Post()
    public async createUser(@Body() userInput: UserInput): Promise<UserIdOutput> {
        const user = await this.userService.createUser(userInput.userId);

        if (!user) {
            throw new ConflictException();
        }

        return user;
    }

    @Post(':userId/urls')
    public async addUrls(@Param('userId') userId: string, @Body() urlInput: UrlInput): Promise<UrlOutput> {
        const user = await this.userService.getUser(userId);

        if (!user) {
            throw new NotFoundException();
        }

        return this.urlService.createUrl(user, urlInput.url);
    }

    @Get(':userId/stats')
    public async userStats(@Param('userId') userId: string): Promise<SummaryOutput> {
        const user = await this.userService.getUser(userId);

        if (!user) {
            throw new NotFoundException();
        }

        const result = await this.urlService.getSummaryByUser(user);

        if (result instanceof(Error)) {
            throw new InternalServerErrorException();
        }

        return result;
    }
}
