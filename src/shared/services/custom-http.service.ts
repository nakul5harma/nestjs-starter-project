import { Injectable, HttpService, HttpStatus } from '@nestjs/common';

import { AxiosRequestConfig, AxiosResponse } from 'axios';
import * as config from 'config';

import { RetryService } from './retry.service';

const retryMetaData = config.get('core-master-data-service.retry');

@Injectable()
export class CustomHttpService {
  constructor(private readonly httpService: HttpService) {}

  async post(url: string, payload: any, requestConfig?: AxiosRequestConfig) {
    return await this.httpService
      .post(url, payload, requestConfig)
      .toPromise()
      .then((response: AxiosResponse) => {
        return response.data;
      });
  }

  async get(url: string, requestConfig?: AxiosRequestConfig) {
    return await this.httpService
      .get(url, requestConfig)
      .toPromise()
      .then((response: AxiosResponse) => {
        return response.data;
      });
  }

  async getWithRetry(url: string) {
    return RetryService.retry(
      this.get(url).catch((error) => {
        if (
          error.response.status === HttpStatus.BAD_REQUEST ||
          error.response.status === HttpStatus.NOT_FOUND
        ) {
          return error;
        }
      }),
      retryMetaData.numberOfRetries,
      retryMetaData.minTimeOut,
      retryMetaData.factor,
    );
  }
}
