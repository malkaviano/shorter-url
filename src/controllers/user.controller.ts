import { Controller, Delete, Param, NotFoundException } from '@nestjs/common';

import { UserService } from '../services/user.service';

@Controller('user')
export class UserController {
    constructor(private readonly service: UserService) { }

    @Delete(':userId')
    public async deleteUser(@Param('userId') userId: string) {
        const user = await this.service.getUser(userId);

        if (!user) {
            throw new NotFoundException();
        }

        await this.service.deleteUser(userId);
    }
}
