import { RouteInfo } from '@nestjs/common/interfaces';

export interface ApiLoggingConfig {
  includeRequestHeaders: string[];
  excludeResponseHeaders: string[];
  ignoreRoutes: RouteInfo[];
}
