import { ExceptionFilter, Catch, ArgumentsHost, HttpStatus } from '@nestjs/common';

import { Logger } from '../../logger/logger';
import { ResponseMessages } from '../constants/response-messages.constants';
import { ResponseModel } from '../models/response.model';
import { getRequestLogData } from '../utils/common.util';

@Catch()
export class UnhandledExceptionsFilter implements ExceptionFilter {
  private readonly logNameSpace = `Filter.${UnhandledExceptionsFilter.name}`;
  private readonly logger = Logger.getInstance();

  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest();
    const response = ctx.getResponse();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;

    let responseModel = new ResponseModel(
      null,
      ResponseMessages.INTERNAL_SERVER_ERROR.code,
      `Error: ${ResponseMessages.INTERNAL_SERVER_ERROR.message}`,
    );

    if (
      exception.message &&
      // tslint:disable-next-line: no-string-literal
      exception.message['statusCode'] === HttpStatus.NOT_FOUND
    ) {
      responseModel = new ResponseModel(
        null,
        ResponseMessages.NOT_FOUND.code,
        `Error: ${ResponseMessages.NOT_FOUND.message}`,
      );

      status = HttpStatus.NOT_FOUND;
    }

    if (
      exception.message &&
      // tslint:disable-next-line: no-string-literal
      exception.message['statusCode'] === HttpStatus.BAD_REQUEST
    ) {
      responseModel = new ResponseModel(
        null,
        ResponseMessages.INVALID_REQUEST_PAYLOAD.code,
        `Error: ${ResponseMessages.INVALID_REQUEST_PAYLOAD.message}`,
      );

      status = HttpStatus.BAD_REQUEST;
    }

    this.logger.error(
      `${this.logNameSpace}.catch.failed`,
      exception.stack,
      exception.message,
      'requestData:',
      getRequestLogData(request),
    );

    response.status(status).json(responseModel);
  }
}
