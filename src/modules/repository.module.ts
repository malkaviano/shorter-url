import { Module, DynamicModule } from '@nestjs/common';
import { RepositoryService } from '../services/repository.service';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UrlRepository } from '../repositories/url.repository';
import { UserRepository } from '../repositories/user.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([UrlRepository]),
    TypeOrmModule.forFeature([UserRepository])
  ],
  providers: [RepositoryService],
  exports: []
})
export class RepositoryModule {

  public static forComponent(): DynamicModule {
    return {
      module: RepositoryModule,
      exports: [RepositoryService],
    }
  }
}
