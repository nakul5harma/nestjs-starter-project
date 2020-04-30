import { HttpException, HttpStatus } from '@nestjs/common';

import { CustomHttpExceptionMessageModel } from '../models/custom-http-exception-message.model';

export class CustomHttpException extends HttpException {
  constructor(
    public message: CustomHttpExceptionMessageModel,
    public httpCode: HttpStatus,
    public data?: any,
  ) {
    super(message, httpCode);
  }
}
