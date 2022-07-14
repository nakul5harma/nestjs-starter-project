import { CustomHttpExceptionMessageModel } from '../../common/models/custom-http-exception-message.model';

export class ResponseMessages {
  static readonly SUCCESS: CustomHttpExceptionMessageModel = {
    code: 'NSP_SUCCESS',
    message: 'Success',
  };

  static readonly INTERNAL_SERVER_ERROR: CustomHttpExceptionMessageModel = {
    code: 'NSP_INTERNAL_SERVER_ERROR',
    message: 'Some error happened on the server, please try again later',
  };

  static readonly NOT_FOUND: CustomHttpExceptionMessageModel = {
    code: 'NSP_NOT_FOUND',
    message: 'Not found',
  };

  static readonly INVALID_REQUEST_PAYLOAD: CustomHttpExceptionMessageModel = {
    code: 'NSP_INVALID_REQUEST_PAYLOAD',
    message: 'Request payload is invalid',
  };

  static readonly FORBIDDEN_RESOURCE: CustomHttpExceptionMessageModel = {
    code: 'NSP_FORBIDDEN_RESOURCE',
    message: 'User is not allowed to access this resource',
  };

  static readonly UNPROCESSABLE_ENTITY: CustomHttpExceptionMessageModel = {
    code: 'NSP_UNPROCESSABLE_ENTITY',
    message: 'Unprocessable entity',
  };

  static readonly UNSUPPORTED_MEDIA_TYPE: CustomHttpExceptionMessageModel = {
    code: 'NSP_UNSUPPORTED_MEDIA_TYPE',
    message: 'Unsupported Media type',
  };
}
