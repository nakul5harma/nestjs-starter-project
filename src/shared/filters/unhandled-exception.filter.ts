import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';

import { ResponseModel } from '../models/response.model';
import { ResponseMessages } from '../constants/response-messages.constants';
import { LoggerService } from '../logger/logger.service';

@Catch()
export class UnhandledExceptionsFilter implements ExceptionFilter {
  private readonly logNamespace = `filter.${UnhandledExceptionsFilter.name.toLowerCase()}`;

  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;

    let responseModel = new ResponseModel(
      null,
      ResponseMessages.INTERNAL_SERVER_ERROR.code,
      ResponseMessages.INTERNAL_SERVER_ERROR.message,
    );

    if (
      exception.message &&
      // tslint:disable-next-line: no-string-literal
      exception.message['statusCode'] === HttpStatus.NOT_FOUND
    ) {
      responseModel = new ResponseModel(
        null,
        ResponseMessages.NOT_FOUND.code,
        ResponseMessages.NOT_FOUND.message,
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
        ResponseMessages.INVALID_REQUEST_PAYLOAD.message,
      );

      status = HttpStatus.BAD_REQUEST;
    }

    LoggerService.getLoggerServiceInstance().error(
      `${this.logNamespace}.catch`,
      exception.stack,
      `Caught unhandled exception - ${JSON.stringify(exception.message)}`,
    );

    response.status(status).json(responseModel);
  }
}
