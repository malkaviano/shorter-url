import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { UserRepository } from '../repositories/user.repository'
import { User } from '../entities/user.entity';
import { UserOutput } from 'src/dtos/user.output';

@Injectable()
export class UserService {
    constructor(@InjectRepository(UserRepository) private readonly repository: UserRepository) { }

    public async getUser(userId: string): Promise<User> {
        return this.repository.findOne({ userId }, { relations: ['urls'] });
    }

    public async deleteUser(userId: string): Promise<boolean> {
        try {
            const { raw, affected } = await this.repository.delete({ userId });

            return !!affected
        } catch (error) {
            return false;
        }

    }

    public async createUser(userId: string): Promise<UserOutput> {
        const result = await this.repository.save(Object.assign(new User(), { userId }));

        return { userId: result.userId };
    }
}
