import * as winston from 'winston';
import * as config from 'config';

import { getDateInYYYYMMDDFormat } from '../utils/common.util';

const { combine, timestamp, json } = winston.format;

const TEN_MBS_IN_BYTES = 10000000;

const serverConfig = config.get('server');
const loggerConfig: winston.LoggerOptions = {
  format: combine(timestamp(), json()),
  transports: [
    new winston.transports.File({
      dirname: 'logs',
      filename: `server-${getDateInYYYYMMDDFormat(new Date())}.log`,
      maxsize: TEN_MBS_IN_BYTES,
      level: process.env.LOG_LEVEL || serverConfig.loglevel || 'info',
    }),
  ],
};

export class LoggerService {
  private static loggerServiceInstance: LoggerService;
  private logger: winston.Logger;

  static getLoggerServiceInstance() {
    if (this.loggerServiceInstance === undefined) {
      this.loggerServiceInstance = new LoggerService();
    }
    return this.loggerServiceInstance;
  }

  private constructor() {
    const environment = config.get('env');

    if (environment !== 'PRODUCTION') {
      (loggerConfig.transports as any[]).push(
        new winston.transports.Console({
          level: 'debug',
        }),
      );
    }

    this.logger = winston.createLogger(loggerConfig);
  }

  info(namespace: string, message?: any, ...meta: any[]) {
    this.logger.log(`info`, message, { namespace, meta });
  }

  error(namespace: string, trace: any, message?: any, ...meta: any[]) {
    this.logger.log(`error`, message, { namespace, trace, meta });
  }

  warn(namespace: string, message?: any, ...meta: any[]) {
    this.logger.log(`warn`, message, { namespace, meta });
  }

  debug(namespace: string, message?: any, ...meta: any[]) {
    this.logger.log(`debug`, message, { namespace, meta });
  }

  log(message: any, namespace: string) {
    this.logger.log(`info`, message, { namespace });
  }
}
