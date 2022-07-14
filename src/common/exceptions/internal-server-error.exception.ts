import { HttpStatus } from '@nestjs/common';

import { ResponseMessages } from '../constants/response-messages.constants';
import { UserMessages } from '../constants/user-messages.constant';
import { CustomHttpException } from './custom-http.exception';

export class InternalServerErrorException extends CustomHttpException {
  constructor(public logNameSpace: string, userMessage?: string, data?: any) {
    super(
      logNameSpace,
      HttpStatus.INTERNAL_SERVER_ERROR,
      ResponseMessages.INTERNAL_SERVER_ERROR.code,
      ResponseMessages.INTERNAL_SERVER_ERROR.message,
      userMessage || UserMessages.INTERNAL_SERVER_ERROR,
      data,
    );
  }
}
