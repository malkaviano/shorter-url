import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UrlsController } from '../controllers/urls.controller';
import { UrlService } from '../services/url.service';
import { UrlRepository } from '../repositories/url.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UrlRepository])],
  controllers: [UrlsController],
  providers: [UrlService],
  exports:[UrlService],
})
export class UrlModule {}
