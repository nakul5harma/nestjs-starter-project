import { RouteInfo } from '@nestjs/common/interfaces';

export interface RequestLoggingInterceptorOptions {
  excludePaths?: RouteInfo[];
}
