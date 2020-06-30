import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user.module';
import { UrlModule } from './modules/url.module';
import { StatsModule } from './modules/stats.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    UserModule,
    UrlModule,
    StatsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
