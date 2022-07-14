import { HttpStatus } from '@nestjs/common';

import { ResponseMessages } from '../constants/response-messages.constants';
import { UserMessages } from '../constants/user-messages.constant';
import { CustomHttpException } from './custom-http.exception';

export class UnprocessableEntityException extends CustomHttpException {
  constructor(
    logNameSpace: string,
    responseCode?: string,
    responseMessage?: string,
    userMessage?: string,
    data?: any,
  ) {
    super(
      logNameSpace,
      HttpStatus.UNPROCESSABLE_ENTITY,
      responseCode || ResponseMessages.UNPROCESSABLE_ENTITY.code,
      responseMessage || ResponseMessages.UNPROCESSABLE_ENTITY.message,
      userMessage || UserMessages.UNPROCESSABLE_ENTITY,
      data,
    );
  }
}
