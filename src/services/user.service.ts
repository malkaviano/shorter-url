import { Injectable, Inject } from '@nestjs/common';

import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

import { User } from '@entities/user.entity';
import { RepositoryService } from '@services/repository.service';
import { UserIdOutput } from '@dtos/user-id.output';

@Injectable()
export class UserService {
    constructor(
        private readonly repository: RepositoryService,
        @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    ) { }

    public async getUser(userId: string): Promise<User> {
        this.logger.info("Getting user id");
        return this.repository.findUser(userId);
    }

    public async deleteUser(userId: string): Promise<boolean> {
        if (!await this.repository.findUser(userId)) {
            return false;
        }

        return this.repository.deleteUser(userId);
    }

    public async createUser(userId: string): Promise<UserIdOutput> {
        return this.repository.createUser(userId);
    }
}
