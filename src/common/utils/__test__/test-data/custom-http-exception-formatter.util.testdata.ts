import { HttpStatus } from '@nestjs/common';

import { ResponseModel } from '../../../../common/models/response.model';
import { CustomHttpException } from '../../../exceptions/custom-http.exception';
import { ResponseMessages } from '../../../constants/response-messages.constants';
import { UserMessages } from '../../../constants/user-messages.constant';

export const mockHttpException = new CustomHttpException(
  `TestData.CustomHttpExceptionFormatterUtil.failed`,
  HttpStatus.INTERNAL_SERVER_ERROR,
  ResponseMessages.INTERNAL_SERVER_ERROR.code,
  ResponseMessages.INTERNAL_SERVER_ERROR.message,
  UserMessages.INTERNAL_SERVER_ERROR,
);

export const mockFormattedError: ResponseModel = {
  code: ResponseMessages.INTERNAL_SERVER_ERROR.code,
  message: `Error: ${ResponseMessages.INTERNAL_SERVER_ERROR.message}`,
  httpStatus: HttpStatus.INTERNAL_SERVER_ERROR,
  userMessage: `Error: ${UserMessages.INTERNAL_SERVER_ERROR}`,
  data: null,
};
