import { ResponseModel } from '../../common/models/response.model';
import { CustomHttpException } from '../exceptions/custom-http.exception';

export const customHttpExceptionFormatter = (exception: CustomHttpException): ResponseModel => {
  return new ResponseModel(
    exception.data ? exception.data : null,
    exception.code,
    exception.httpStatus,
    `Error: ${exception.userMessage}`,
    `Error: ${exception.message}`,
  );
};
