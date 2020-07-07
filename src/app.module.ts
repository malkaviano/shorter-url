import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user.module';
import { UrlModule } from './modules/url.module';
import { StatsModule } from './modules/stats.module';
import { RepositoryModule } from './modules/repository.module';
import { ShortenerModule } from './modules/shortener.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    UserModule,
    UrlModule,
    StatsModule,
    RepositoryModule,
    ShortenerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
