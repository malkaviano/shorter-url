import { Module } from '@nestjs/common';

import { UserController } from '@controllers/user.controller';
import { UserService } from '@services/user.service';
import { UsersController } from '@controllers/users.controller';
import { RepositoryModule } from '@modules/repository.module';
import { UrlModule } from '@modules/url.module';

@Module({
  imports: [RepositoryModule.forComponent(), UrlModule.forComponent()],
  controllers: [UserController, UsersController],
  providers: [UserService],
})
export class UserModule {}
