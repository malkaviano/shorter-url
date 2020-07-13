import { Module, DynamicModule } from '@nestjs/common';

import { UrlsController } from '@controllers/urls.controller';
import { UrlService } from '@services/url.service';
import { RepositoryModule } from '@modules/repository.module';
import { ShortenerModule } from '@modules/shortener.module';

@Module({
  imports: [RepositoryModule.forComponent(), ShortenerModule.forComponent()],
  controllers: [UrlsController],
  providers: [UrlService],
})
export class UrlModule {
  public static forComponent(): DynamicModule {
    return {
      module: UrlModule,
      exports:[UrlService],
    }
  }
}
