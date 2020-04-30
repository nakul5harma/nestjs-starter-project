import { CustomHttpExceptionMessageModel } from '../models/custom-http-exception-message.model';

export class ResponseMessages {
  static readonly SUCCESS: CustomHttpExceptionMessageModel = {
    code: 'SUCCESS',
    message: 'Success',
  };
  static readonly INTERNAL_SERVER_ERROR: CustomHttpExceptionMessageModel = {
    code: 'INTERNAL_SERVER_ERROR',
    message: 'Some error happened on the server, please try again later',
  };
  static readonly NOT_FOUND: CustomHttpExceptionMessageModel = {
    code: 'NOT_FOUND',
    message: 'Not found',
  };
  static readonly INVALID_REQUEST_PAYLOAD: CustomHttpExceptionMessageModel = {
    code: 'INVALID_REQUEST_PAYLOAD',
    message: 'Request payload is invalid',
  };
}
