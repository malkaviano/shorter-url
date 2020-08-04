import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as helmet from 'helmet';
import * as rateLimit from 'express-rate-limit';
import { WinstonModule } from 'nest-winston';

import { AppModule } from '@modules/app.module';

import { winstonConfig } from './configs/winston.config';

async function bootstrap() {
  const logger = WinstonModule.createLogger(winstonConfig);

  const app = await NestFactory.create(AppModule, { logger });

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true,
  }  ));

  app.use(helmet());

  app.enableCors();

  app.use(
    rateLimit({
      windowMs: 60 * 1000,
      max: 50,
    }),
  );

  const options = new DocumentBuilder()
    .setTitle('Url Shortener')
    .setDescription('Another URL shortener')
    .setVersion('1.0')
    .addTag('url shortner')
    .build();

  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT || 8500);
}
bootstrap();
