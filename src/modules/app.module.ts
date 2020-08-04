import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from '@controllers/app.controller';
import { AppService } from '@services/app.service';
import { UserModule } from '@modules/user.module';
import { UrlModule } from '@modules/url.module';
import { StatsModule } from '@modules/stats.module';
import { WinstonModule } from 'nest-winston';
import { winstonConfig } from '../configs/winston.config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LoggerInterceptor } from '../interceptors/logger.interceptor';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    WinstonModule.forRoot(winstonConfig),
    UserModule,
    UrlModule,
    StatsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggerInterceptor,
    },
  ],
})
export class AppModule {}
