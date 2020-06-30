import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { UserRepository } from '../repositories/user.repository'
import { User } from '../entities/user.entity';

@Injectable()
export class UserService {
    constructor(@InjectRepository(UserRepository) private readonly repository: UserRepository) { }

    public async getUser(userId: string): Promise<User> {
        return this.repository.findOne({ userId });
    }

    public async deleteUser(userId: string): Promise<boolean> {
        try {
            const { raw, affected } = await this.repository.delete({ userId });

            return !!affected
        } catch (error) {
            return false;
        }

    }
}
