import { Request } from 'express';

import { EnvironmentTypes, ENVIRONMENT } from '../configs/environment.config';
import { RequestLogData } from '../models/request-log-data.model';
import { ResponseLogData } from '../models/response-log-data.model';
import { ResponseModel } from '../models/response.model';

export const getDateInYYYYMMDDFormat = (date: Date): string => {
  return date.toISOString().slice(0, 10);
};

export const getCurrentUTCDate = () => {
  return new Date(new Date().toUTCString().slice(0, -3));
};

export const isProductionEnv = (): boolean => {
  return ENVIRONMENT === EnvironmentTypes.PRODUCTION;
};

export const getRequestLogData = (request: Request): RequestLogData => {
  return {
    fromIP: request.headers['x-forwarded-for'] || request.connection.remoteAddress,
    requestMethod: request.method,
    originalUri: request.originalUrl,
    uri: request.url,
    requestBody: request.body,
    requestHeaders: request.headers,
    referer: request.headers.referer || '',
    userAgent: request.headers['user-agent'],
  };
};

export const getResponseLogData = (
  request: Request,
  responseBody: ResponseModel,
  requestTime: number,
): ResponseLogData => {
  return {
    ...getRequestLogData(request),
    receivedAt: new Date(requestTime).toISOString(),
    responseData: responseBody,
    timeTakenToProcess: `${Date.now() - requestTime} ms`,
  };
};
