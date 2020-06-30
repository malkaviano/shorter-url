import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserController } from '../controllers/user.controller';
import { UserService } from '../services/user.service';
import { UserRepository } from '../repositories/user.repository';
import { UsersController } from '../controllers/users.controller';
import { UrlModule } from './url.module';

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository]), UrlModule],
  controllers: [UserController, UsersController],
  providers: [UserService],
})
export class UserModule {}
