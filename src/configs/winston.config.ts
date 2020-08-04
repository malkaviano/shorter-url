import {
    utilities as nestWinstonModuleUtilities,
    WinstonModuleOptions,
  } from 'nest-winston';
  import * as winston from 'winston';

  export const winstonConfig: WinstonModuleOptions = {
    levels: winston.config.npm.levels,
    level: 'info',
    transports: [
      new winston.transports.Console({
        format: winston.format.combine(
          winston.format.timestamp(),
          nestWinstonModuleUtilities.format.nestLike(),
          winston.format.json(),
        ),
      }),
      new winston.transports.File({
        level: 'info',
        filename: 'application.log',
        dirname: 'logs',
        format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.json(),
          ),
      }),
    ],
  };