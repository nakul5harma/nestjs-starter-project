import { HttpStatus } from '@nestjs/common';

export class ResponseModel {
  data: object[] | object | string | string[] | null;
  code: string;
  message: string;
  httpStatus: HttpStatus;
  userMessage: string;

  constructor(
    data: object | object[] | string,
    code: string,
    httpStatus: HttpStatus,
    userMessage: string,
    message?: string,
  ) {
    this.code = code;
    this.message = message || null;
    this.data = data;
    this.httpStatus = httpStatus;
    this.userMessage = userMessage;
  }
}
