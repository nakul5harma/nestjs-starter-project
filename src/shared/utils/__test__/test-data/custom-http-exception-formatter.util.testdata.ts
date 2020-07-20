import { HttpStatus } from '@nestjs/common';

import { ResponseMessages } from '../../../constants/response-messages.constants';
import { CustomHttpException } from '../../../exceptions/custom-http.exception';
import { ResponseModel } from '../../../../shared/models/response.model';

export const mockHttpException = new CustomHttpException(
  ResponseMessages.INTERNAL_SERVER_ERROR,
  HttpStatus.INTERNAL_SERVER_ERROR,
);

export const mockFormattedError: ResponseModel = {
  code: ResponseMessages.INTERNAL_SERVER_ERROR.code,
  message: `Error: ${ResponseMessages.INTERNAL_SERVER_ERROR.message}`,
  data: null,
};
