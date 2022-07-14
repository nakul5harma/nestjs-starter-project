import { HttpStatus } from '@nestjs/common';

import { ResponseMessages } from '../constants/response-messages.constants';
import { UserMessages } from '../constants/user-messages.constant';
import { CustomHttpException } from './custom-http.exception';

export class UnsupportedMediaException extends CustomHttpException {
  constructor(
    logNameSpace: string,
    responseCode?: string,
    responseMessage?: string,
    userMessage?: string,
    data?: any,
  ) {
    super(
      logNameSpace,
      HttpStatus.UNSUPPORTED_MEDIA_TYPE,
      responseCode || ResponseMessages.UNSUPPORTED_MEDIA_TYPE.code,
      responseMessage || ResponseMessages.UNSUPPORTED_MEDIA_TYPE.message,
      userMessage || UserMessages.UNSUPPORTED_MEDIA_TYPE,
      data,
    );
  }
}
