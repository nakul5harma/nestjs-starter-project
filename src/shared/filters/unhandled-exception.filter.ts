import { ExceptionFilter, Catch, ArgumentsHost, HttpStatus } from '@nestjs/common';

import { LoggerService } from '../logger/logger.service';
import { ResponseMessages } from '../constants/response-messages.constants';
import { ResponseModel } from '../models/response.model';

@Catch()
export class UnhandledExceptionsFilter implements ExceptionFilter {
  private readonly logNamespace = `filter.${UnhandledExceptionsFilter.name.toLowerCase()}`;
  private readonly logger = LoggerService.getLoggerServiceInstance();

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

    this.logger.error(`${this.logNamespace}.catch.failed`, exception.stack, exception.message);

    response.status(status).json(responseModel);
  }
}
