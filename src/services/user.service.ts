import { Injectable } from '@nestjs/common';

import { User } from '../entities/user.entity';
import { RepositoryService } from './repository.service';
import { UserIdOutput } from '../dtos/user-id.output';

@Injectable()
export class UserService {
    constructor(private readonly repository: RepositoryService) { }

    public async getUser(userId: string): Promise<User> {
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
