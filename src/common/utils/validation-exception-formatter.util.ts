import { HttpStatus } from '@nestjs/common';

import { ResponseModel } from '../../common/models/response.model';
import { ValidationException } from '../exceptions/validation.exception';
import { ResponseMessages } from '../constants/response-messages.constants';
import { UserMessages } from '../constants/user-messages.constant';

export const validationExceptionFormatter = (exception: ValidationException): ResponseModel => {
  return new ResponseModel(
    exception.validationErrors,
    ResponseMessages.INVALID_REQUEST_PAYLOAD.code,
    HttpStatus.BAD_REQUEST,
    `Error: ${UserMessages.INVALID_REQUEST_PAYLOAD}`,
    `Error: ${exception.getErrorMessage()}`,
  );
};
