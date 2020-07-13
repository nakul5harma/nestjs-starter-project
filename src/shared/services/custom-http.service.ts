import { Injectable, HttpService } from '@nestjs/common';

import { AxiosRequestConfig, AxiosResponse } from 'axios';

import { LoggerService } from '../logger/logger.service';

@Injectable()
export class CustomHttpService {
  private readonly logNamespace = `service.${CustomHttpService.name.toLowerCase()}`;
  private readonly logger = LoggerService.getLoggerServiceInstance();

  constructor(private readonly httpService: HttpService) {}

  async post(url: string, payload: any, requestConfig?: AxiosRequestConfig) {
    this.logger.info(
      `${this.logNamespace}.post.started`,
      '',
      'url:',
      url,
      'payload:',
      payload,
      'requestConfig:',
      requestConfig,
    );

    return await this.httpService
      .post(url, payload, requestConfig)
      .toPromise()
      .then((response: AxiosResponse) => {
        this.logger.info(
          `${this.logNamespace}.post.success`,
          '',
          'url:',
          url,
          'payload:',
          payload,
          'requestConfig:',
          requestConfig,
          'response:',
          response,
        );

        return response.data;
      });
  }

  async get(url: string, requestConfig?: AxiosRequestConfig) {
    this.logger.info(
      `${this.logNamespace}.get.started`,
      '',
      'url:',
      url,
      'requestConfig:',
      requestConfig,
    );

    return await this.httpService
      .get(url, requestConfig)
      .toPromise()
      .then((response: AxiosResponse) => {
        this.logger.info(
          `${this.logNamespace}.get.success`,
          '',
          'url:',
          url,
          'requestConfig:',
          requestConfig,
          'response:',
          response,
        );

        return response.data;
      });
  }

  async delete(url: string, requestConfig?: AxiosRequestConfig) {
    this.logger.info(
      `${this.logNamespace}.delete.started`,
      '',
      'url:',
      url,
      'requestConfig:',
      requestConfig,
    );

    return await this.httpService
      .delete(url, requestConfig)
      .toPromise()
      .then((response: AxiosResponse) => {
        this.logger.info(
          `${this.logNamespace}.delete.success`,
          '',
          'url:',
          url,
          'requestConfig:',
          requestConfig,
          'response:',
          response,
        );

        return response.data;
      });
  }
}
