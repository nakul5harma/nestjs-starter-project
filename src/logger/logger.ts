import { LoggerService, RequestMethod } from '@nestjs/common';
import { RouteInfo } from '@nestjs/common/interfaces';

import { Request } from 'express';
import { format, transports, createLogger, Logger as WinstonLogger } from 'winston';
import rTracer = require('cls-rtracer');
import { get, omit } from 'lodash';
import {
  logger as ExpressWinstonLogger,
  requestWhitelist,
  responseWhitelist,
} from 'express-winston';

import { get as getConfig } from '../../config';
import { ServerConfig } from '../common/models/configs/server.config';
import { ApiLoggingConfig } from '../common/models/configs/api-logging.config';
import { maskPII } from '../common/utils/text-transformation.util';

const SERVER_CONFIG = getConfig<ServerConfig>('server');
const { ignoreRoutes } = getConfig<ApiLoggingConfig>('api-logging');

const OMITTED_KEYS_FROM_LOG_OBJECT = [
  'message',
  'level',
  'timestamp',
  'namespace',
  'meta',
  'meta.req',
  'meta.res',
  'error',
  'error_stack',
];
const CONFIGURED_LOG_LEVEL = SERVER_CONFIG.logLevel || 'info';

const addCustomAttributesToLogObject = format((info, opts) => {
  const data = {
    correlation_id: rTracer.id(),
    level: info.level,
    timestamp: info.timestamp,
    message: info.message,
    type: opts.tag,
  };
  if (opts.tag === 'app') {
    return {
      ...omit(info, OMITTED_KEYS_FROM_LOG_OBJECT),
      nsp: {
        log: {
          ...data,
          namespace: info.namespace,
          error: info.error,
          error_stack: info.error_stack,
          meta: info.meta,
        },
      },
    };
  } else {
    return {
      ...omit(info, OMITTED_KEYS_FROM_LOG_OBJECT),
      nsp: {
        log: {
          ...data,
        },
        req: {
          url: get(info, 'meta.req.url'),
          method: get(info, 'meta.req.method'),
          referer: get(info, 'meta.req.headers.referer'),
          userAgent: get(info, 'meta.req.headers["user-agent"]'),
          userIp: get(info, 'meta.req.headers["x-forwarded-for"]'),
          userId: get(info, 'meta.req.headers["x-consumer-id"]'),
          userRoles: get(info, 'meta.req.headers["x-consumer-role"]'),
          httpVersion: get(info, 'meta.req.httpVersion'),
          body: get(info, 'meta.req.body'),
          query: get(info, 'meta.req.query'),
        },
        res: {
          body: get(info, 'meta.res.body'),
          statusCode: get(info, 'meta.res.statusCode'),
        },
      },
    };
  }
});

const maskLogs = format((info) => {
  const nspLogs = info.nsp;
  const nspLogsString = JSON.stringify(nspLogs);
  const maskedNspLogsString = maskPII(nspLogsString);
  info.nsp = JSON.parse(maskedNspLogsString);
  return info;
});

const CONFIGURED_TRANSPORTS = [new transports.Console({ level: CONFIGURED_LOG_LEVEL })];

class AppLogger implements LoggerService {
  private logger: WinstonLogger;

  constructor() {
    this.logger = createLogger({
      format: format.combine(
        format.timestamp(),
        addCustomAttributesToLogObject({ tag: 'app' }),
        maskLogs(),
        format.json(),
      ),
      transports: CONFIGURED_TRANSPORTS,
    });
  }

  public info(namespace: string, meta?: object) {
    this.logger.log(`info`, '', {
      namespace,
      meta,
    });
  }

  public error(namespace: string, error: object | string, meta?: string | object) {
    this.logger.log(`error`, '', {
      namespace,
      error_stack: error instanceof Error ? error.stack : error,
      error,
      meta,
    });
  }

  public warn(namespace: string, meta?: object | string) {
    this.logger.log(`warn`, '', {
      namespace,
      meta,
    });
  }

  public debug(namespace: string, meta?: object | string) {
    this.logger.log(`debug`, '', {
      namespace,
      meta,
    });
  }

  public log(message: any, namespace: string) {
    this.logger.log(`info`, message, { namespace });
  }
}

export const Logger = new AppLogger();

export const ApiLoggerMiddleware = ExpressWinstonLogger({
  transports: CONFIGURED_TRANSPORTS,
  format: format.combine(
    format.timestamp(),
    addCustomAttributesToLogObject({ tag: 'access' }),
    maskLogs(),
    format.json(),
  ),
  expressFormat: true,
  requestWhitelist: [...requestWhitelist, 'body'],
  responseWhitelist: [...responseWhitelist, 'body'],
  ignoreRoute: (req: Request) => {
    const ignoredRoutes: RouteInfo[] = [
      ...ignoreRoutes,
      { method: RequestMethod.GET, path: '/app/health' },
      { method: RequestMethod.GET, path: '/app/deephealth' },
    ];

    const isExcludedPath = (request: Request): boolean => {
      const routeInfo: RouteInfo = {
        path: request.url,
        method: RequestMethod[request.method],
      };

      return (
        ignoredRoutes.findIndex((route: RouteInfo) => {
          return route.path === routeInfo.path && route.method === routeInfo.method;
        }) > -1
      );
    };

    return isExcludedPath(req);
  },
});
