import { HttpStatus } from '@nestjs/common';

import { ResponseModel } from '../../common/models/response.model';
import { ResponseMessages } from '../constants/response-messages.constants';

export class SuccessResponseDto extends ResponseModel {
  constructor(data: object | object[] | string, userMessage?: string) {
    super(
      data,
      ResponseMessages.SUCCESS.code,
      HttpStatus.OK,
      userMessage || ResponseMessages.SUCCESS.message,
      ResponseMessages.SUCCESS.message,
    );
  }
}
