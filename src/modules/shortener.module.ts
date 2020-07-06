import { Module } from '@nestjs/common';

import { ShortenerService } from '../services/shortener.service';

@Module({
  providers: [ShortenerService],
  exports: [ShortenerService]
})
export class ShortenerModule {}
