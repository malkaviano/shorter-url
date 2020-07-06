import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UrlsController } from '../controllers/urls.controller';
import { UrlService } from '../services/url.service';
import { RepositoryModule } from './repository.module';

@Module({
  imports: [RepositoryModule],
  controllers: [UrlsController],
  providers: [UrlService],
  exports:[UrlService],
})
export class UrlModule {}
