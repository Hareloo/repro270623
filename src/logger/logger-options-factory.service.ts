import { format as winstonFormat, transports } from 'winston';
import type { WinstonModuleOptions } from 'nest-winston';
import { Injectable } from '@nestjs/common';
import 'winston-daily-rotate-file';

@Injectable()
export class LoggerOptionsFactoryService {
  createWinstonModuleOptions(): WinstonModuleOptions {
    const logFolderName = 'logs';

    // Define the levels that can be used for logging
    const levels = {
      error: 0,
      warn: 1,
      info: 2,
      verbose: 3,
      http: 4,
    };

    // Define the format in which we want to log
    const format = winstonFormat.combine(
      winstonFormat.timestamp(),
      winstonFormat.json(),
    );

    // Tell winston to log to console, file and datadog
    const customTransports = [
      new transports.Console({ format }),
      new transports.DailyRotateFile({
        frequency: '24h',
        datePattern: 'YYYY-MM-DD',
        dirname: logFolderName,
        extension: '.log',
        filename: 'distributor-%DATE%',
        handleExceptions: true,
        maxSize: '5m',
        maxFiles: 5,
        format,
      }),
    ];

    return {
      level: 'http',
      levels,
      format,
      transports: customTransports,
    };
  }
}
