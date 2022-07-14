import { HttpStatus } from '@nestjs/common';

import { ResponseMessages } from '../constants/response-messages.constants';
import { UserMessages } from '../constants/user-messages.constant';
import { CustomHttpException } from './custom-http.exception';

export class ForbiddenException extends CustomHttpException {
  constructor(
    public logNameSpace: string,
    code?: string,
    message?: string,
    userMessage?: string,
    data?: any,
  ) {
    super(
      logNameSpace,
      HttpStatus.FORBIDDEN,
      code || ResponseMessages.FORBIDDEN_RESOURCE.code,
      message || ResponseMessages.FORBIDDEN_RESOURCE.message,
      userMessage || UserMessages.FORBIDDEN_RESOURCE,
      data,
    );
  }
}
