import { Module, DynamicModule } from '@nestjs/common';

import { ShortenerService } from '../services/shortener.service';

@Module({
  providers: [ShortenerService],
})
export class ShortenerModule {
  public static forComponent(): DynamicModule {
    return {
      module: ShortenerModule,
      exports: [ShortenerService],
    }
  }
}
