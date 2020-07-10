import { Module } from '@nestjs/common';

import { StatsController } from '../controllers/stats.controller';
import { UrlModule } from './url.module';

@Module({
  imports:[UrlModule.forComponent()],
  controllers: [StatsController]
})
export class StatsModule {}
