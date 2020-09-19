import { LoggerService } from '@nestjs/common';

import { format, transports, createLogger, LoggerOptions, Logger as WinstonLogger } from 'winston';
import { get } from 'config';
import rTracer = require('cls-rtracer');

import { getDateInYYYYMMDDFormat, isProductionEnv } from '../shared/utils/common.util';
import { ServerConfig } from '../shared/models/config/server.config';

const { combine, timestamp, json } = format;

const TEN_MBS_IN_BYTES = 10000000;

const serverConfig = get<ServerConfig>('server');

const loggerConfig: LoggerOptions = {
  format: combine(timestamp(), json()),
  transports: [
    new transports.File({
      dirname: 'logs',
      filename: `nestjs-starter-project-${getDateInYYYYMMDDFormat(new Date())}.log`,
      maxsize: TEN_MBS_IN_BYTES,
      level: process.env.LOG_LEVEL || serverConfig.logLevel || 'info',
    }),
  ],
};

export class Logger implements LoggerService {
  private static loggerInstance: Logger = null;
  private logger: WinstonLogger;

  static getInstance() {
    if (!this.loggerInstance) {
      this.loggerInstance = new Logger();
    }
    return this.loggerInstance;
  }

  private constructor() {
    if (!isProductionEnv()) {
      (loggerConfig.transports as any[]).push(
        new transports.Console({
          level: 'debug',
        }),
      );
    }

    this.logger = createLogger(loggerConfig);
  }

  info(namespace: string, message?: any, ...meta: any[]) {
    this.logger.log(`info`, message, { namespace, meta, correlationId: rTracer.id() });
  }

  error(namespace: string, trace: any, message?: any, ...meta: any[]) {
    this.logger.log(`error`, message, { namespace, trace, meta, correlationId: rTracer.id() });
  }

  warn(namespace: string, message?: any, ...meta: any[]) {
    this.logger.log(`warn`, message, { namespace, meta, correlationId: rTracer.id() });
  }

  debug(namespace: string, message?: any, ...meta: any[]) {
    this.logger.log(`debug`, message, { namespace, meta, correlationId: rTracer.id() });
  }

  log(message: any, namespace: string) {
    this.logger.log(`info`, message, { namespace });
  }
}
