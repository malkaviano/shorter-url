import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserController } from '../controllers/user.controller';
import { UserService } from '../services/user.service';
import { UserRepository } from '../repositories/user.repository';
import { UsersController } from '../users/users.controller';
import { UrlService } from '../services/url.service';
import { UrlRepository } from '../repositories/url.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository, UrlRepository])],
  controllers: [UserController, UsersController],
  providers: [UserService, UrlService],
})
export class UserModule {}
