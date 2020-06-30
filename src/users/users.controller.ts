import { Controller, Get, Param, NotFoundException, Post, Body, ConflictException } from '@nestjs/common';

import { UserService } from '../services/user.service';
import { UserInput } from '../dtos/user.input';
import { UserUrlInput } from '../dtos/user-url.input';

@Controller('users')
export class UsersController {
    constructor(private readonly service: UserService) { }

    @Get(':userId/stats')
    public async userStats(@Param('userId') userId: string) {
        const user = await this.service.getUser(userId);

        if (user) {
            return user;
        }

        throw new NotFoundException();
    }

    @Post()
    public async createUser(@Body() userInput: UserInput) {
        try {
            return await this.service.createUser(userInput.userId);
        } catch (error) {
            throw new ConflictException();
        }
    }

    @Post(':userid/urls')
    public async addUrls(@Param('userId') userId: string, @Body() userUrlInput: UserUrlInput) {

    }
}
