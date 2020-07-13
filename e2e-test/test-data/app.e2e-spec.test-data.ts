import { ResponseMessages } from '../../src/shared/constants/response-messages.constants';

export const mockHealthCheckAPIResponse = {
  data: `I am healthy, running version 1.0.0`,
  code: ResponseMessages.SUCCESS.code,
  message: ResponseMessages.SUCCESS.message,
};
