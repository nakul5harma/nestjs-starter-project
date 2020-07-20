import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  RequestMethod,
} from '@nestjs/common';
import { RouteInfo } from '@nestjs/common/interfaces';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Request } from 'express';

import { getRequestLogData, getResponseLogData } from '../../shared/utils/common.util';
import { ResponseModel } from '../../shared/models/response.model';
import { RequestLoggingInterceptorOptions } from '../models/request-logging-interceptor-options.model';
import { Logger } from '../logger';

@Injectable()
export class RequestLoggingInterceptor implements NestInterceptor {
  private readonly logNameSpace = `Interceptor.${RequestLoggingInterceptor.name}`;
  private readonly logger = Logger.getInstance();
  private excludePaths: RouteInfo[];

  constructor(options?: RequestLoggingInterceptorOptions) {
    this.excludePaths = options?.excludePaths || [];
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<ResponseModel> {
    const request: Request = context.switchToHttp().getRequest();

    if (this.isExcludedPath(request)) {
      return next.handle();
    }

    const now = Date.now();

    this.logger.info(
      `${this.logNameSpace}.intercept.started`,
      'Request received',
      'requestData:',
      getRequestLogData(request),
    );

    return next.handle().pipe(
      tap((body: ResponseModel) => {
        this.logger.info(
          `${this.logNameSpace}.intercept.success`,
          'Request processed',
          'responseData:',
          getResponseLogData(request, body, now),
        );
      }),
    );
  }

  private isExcludedPath(request: Request): boolean {
    const routeInfo: RouteInfo = {
      path: request.url,
      method: RequestMethod[request.method],
    };

    return (
      this.excludePaths.findIndex((route: RouteInfo) => {
        return route.path === routeInfo.path && route.method === routeInfo.method;
      }) > -1
    );
  }
}
