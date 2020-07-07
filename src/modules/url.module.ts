import { Module } from '@nestjs/common';

import { UrlsController } from '../controllers/urls.controller';
import { UrlService } from '../services/url.service';
import { RepositoryModule } from './repository.module';
import { ShortenerModule } from './shortener.module';

@Module({
  imports: [RepositoryModule, ShortenerModule],
  controllers: [UrlsController],
  providers: [UrlService],
  exports:[UrlService],
})
export class UrlModule {}
