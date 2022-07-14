import { ExceptionFilter, Catch, ArgumentsHost, HttpStatus, HttpException } from '@nestjs/common';

import { ResponseModel } from '../../common/models/response.model';
import { Logger } from '../../logger/logger';
import { CustomHttpException } from '../exceptions/custom-http.exception';
import { UserMessages } from '../constants/user-messages.constant';
import { ResponseMessages } from '../constants/response-messages.constants';

@Catch()
export class CustomExceptionFilter implements ExceptionFilter {
  private logNameSpace = `Filters.${CustomExceptionFilter.name}`;

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    if (exception instanceof CustomHttpException) {
      Logger.warn(exception.logNameSpace, { data: exception });

      return response
        .status(exception.httpStatus)
        .json(
          new ResponseModel(
            exception.data,
            exception.code,
            exception.httpStatus,
            exception.userMessage,
            exception.message,
          ),
        );
    }

    if (exception instanceof HttpException) {
      const exceptionCopy = exception as any;

      Logger.error(`${this.logNameSpace}.httpException`, exceptionCopy, { data: exceptionCopy });

      if (exceptionCopy.status === HttpStatus.NOT_FOUND) {
        return response
          .status(HttpStatus.NOT_FOUND)
          .json(
            new ResponseModel(
              null,
              ResponseMessages.NOT_FOUND.code,
              HttpStatus.NOT_FOUND,
              UserMessages.NOT_FOUND,
              ResponseMessages.NOT_FOUND.message,
            ),
          );
      }

      if (exceptionCopy.status === HttpStatus.BAD_REQUEST) {
        return response
          .status(HttpStatus.BAD_REQUEST)
          .json(
            new ResponseModel(
              exceptionCopy.data,
              exceptionCopy.code,
              HttpStatus.BAD_REQUEST,
              exceptionCopy.userMessage,
              exceptionCopy.message,
            ),
          );
      }
    }

    Logger.error(`${this.logNameSpace}.internalServerError`, exception as object);

    return response
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json(
        new ResponseModel(
          null,
          ResponseMessages.INTERNAL_SERVER_ERROR.code,
          HttpStatus.INTERNAL_SERVER_ERROR,
          ResponseMessages.INTERNAL_SERVER_ERROR.message,
          ResponseMessages.INTERNAL_SERVER_ERROR.message,
        ),
      );
  }
}
