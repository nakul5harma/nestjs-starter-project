import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

import { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

import { Logger } from '../../logger/logger';
import { ResponseMessages } from '../constants/response-messages.constants';
import { UserMessages } from '../constants/user-messages.constant';
import { UnsupportedMediaException } from '../exceptions/unsupported-media-type.exception';
import { isJSON } from '../utils/common.util';

@Injectable()
export class CustomHttpService {
  private readonly logNameSpace = `Service.${CustomHttpService.name}`;

  constructor(private readonly httpService: HttpService) {}

  private handleAxiosError(namespace: string, error: AxiosError) {
    Logger.error(namespace, error, {
      responseData: error.response?.data,
      responseStatus: error.response?.status,
      errorCode: error.code,
    });

    throw error;
  }

  public validateResponseIsJson(response) {
    if (!isJSON(response)) {
      throw new UnsupportedMediaException(
        `${this.logNameSpace}.validateJsonResponse.failed`,
        ResponseMessages.UNSUPPORTED_MEDIA_TYPE.code,
        ResponseMessages.UNSUPPORTED_MEDIA_TYPE.message,
        UserMessages.UNSUPPORTED_MEDIA_TYPE,
      );
    }
    return response;
  }

  async post(
    url: string,
    payload: any,
    requestConfig?: AxiosRequestConfig,
    doNotLogResponse = false,
    doNotLogPayload = false,
  ) {
    Logger.info(`${this.logNameSpace}.post.started`, {
      url,
      payload: doNotLogPayload ? undefined : payload,
      requestConfig,
    });

    return await this.httpService
      .post(url, payload, requestConfig)
      .toPromise()
      .then((response: AxiosResponse) => {
        Logger.info(`${this.logNameSpace}.post.success`, {
          responseData: doNotLogResponse ? undefined : response.data,
        });

        return response.data;
      })
      .catch((error: AxiosError) => {
        this.handleAxiosError(`${this.logNameSpace}.post.failed`, error);
      });
  }

  async put(url: string, payload: any, requestConfig?: AxiosRequestConfig) {
    Logger.info(`${this.logNameSpace}.put.started`, { url, payload, requestConfig });

    return await this.httpService
      .put(url, payload, requestConfig)
      .toPromise()
      .then((response: AxiosResponse) => {
        Logger.info(`${this.logNameSpace}.put.success`, { responseData: response.data });

        return response.data;
      })
      .catch((error: AxiosError) => {
        this.handleAxiosError(`${this.logNameSpace}.put.failed`, error);
      });
  }

  async get(url: string, requestConfig?: AxiosRequestConfig) {
    Logger.info(`${this.logNameSpace}.get.started`, { url, requestConfig });

    return await this.httpService
      .get(url, requestConfig)
      .toPromise()
      .then((response: AxiosResponse) => {
        Logger.info(`${this.logNameSpace}.get.success`, { responseData: response.data });

        return response.data;
      })
      .catch((error: AxiosError) => {
        this.handleAxiosError(`${this.logNameSpace}.get.failed`, error);
      });
  }

  async delete(url: string, requestConfig?: AxiosRequestConfig) {
    Logger.info(`${this.logNameSpace}.delete.started`, { url, requestConfig });

    return await this.httpService
      .delete(url, requestConfig)
      .toPromise()
      .then((response: AxiosResponse) => {
        Logger.info(`${this.logNameSpace}.delete.success`, { responseData: response.data });

        return response.data;
      })
      .catch((error: AxiosError) => {
        this.handleAxiosError(`${this.logNameSpace}.delete.failed`, error);
      });
  }

  async patch(url: string, payload: any, requestConfig?: AxiosRequestConfig) {
    Logger.info(`${this.logNameSpace}.patch.started`, { url, payload, requestConfig });

    return await this.httpService
      .patch(url, payload, requestConfig)
      .toPromise()
      .then((response: AxiosResponse) => {
        Logger.info(`${this.logNameSpace}.patch.success`, { responseData: response.data });

        return response.data;
      })
      .catch((error: AxiosError) => {
        this.handleAxiosError(`${this.logNameSpace}.patch.failed`, error);
      });
  }
}
