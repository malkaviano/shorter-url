import { Controller, Delete, Param, NotFoundException } from '@nestjs/common';

import { UserService } from '@services/user.service';

@Controller('user')
export class UserController {
    constructor(private readonly service: UserService) { }

    @Delete(':userId')
    public async deleteUser(@Param('userId') userId: string) {
        const result = await this.service.deleteUser(userId);

        if (!result) {
            throw new NotFoundException();
        }
    }
}
