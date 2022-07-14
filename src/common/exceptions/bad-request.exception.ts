import { HttpStatus } from '@nestjs/common';

import { ResponseMessages } from '../constants/response-messages.constants';
import { UserMessages } from '../constants/user-messages.constant';
import { CustomHttpException } from './custom-http.exception';

export class BadRequestException extends CustomHttpException {
  constructor(
    public logNameSpace: string,
    code?: string,
    message?: string,
    userMessage?: string,
    data?: any,
  ) {
    super(
      logNameSpace,
      HttpStatus.BAD_REQUEST,
      code || ResponseMessages.INVALID_REQUEST_PAYLOAD.code,
      message || ResponseMessages.INVALID_REQUEST_PAYLOAD.message,
      userMessage || UserMessages.INVALID_REQUEST_PAYLOAD,
      data,
    );
  }
}
