import retry = require('async-retry');

import { LoggerService } from '../logger/logger.service';

export class RetryService {
  private static readonly logNamespace = `service.${RetryService.name.toLowerCase()}`;

  static async retry(
    retryFunction: any,
    numberOfRetries: number,
    minTimeOut: number,
    factor: number,
  ) {
    return await retry(() => retryFunction, {
      retries: numberOfRetries,
      onRetry: () => {
        LoggerService.getLoggerServiceInstance().debug(
          `${RetryService.logNamespace}.retry`,
          `Retrying...`,
        );
      },
      minTimeout: minTimeOut,
      factor,
    });
  }
}
