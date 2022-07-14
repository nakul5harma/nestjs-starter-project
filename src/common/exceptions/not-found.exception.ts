import { HttpStatus } from '@nestjs/common';

import { ResponseMessages } from '../constants/response-messages.constants';
import { UserMessages } from '../constants/user-messages.constant';
import { CustomHttpException } from './custom-http.exception';

export class NotFoundException extends CustomHttpException {
  constructor(public logNameSpace: string, userMessage?: string, data?: any) {
    super(
      logNameSpace,
      HttpStatus.NOT_FOUND,
      ResponseMessages.NOT_FOUND.code,
      ResponseMessages.NOT_FOUND.message,
      userMessage || UserMessages.NOT_FOUND,
      data,
    );
  }
}
