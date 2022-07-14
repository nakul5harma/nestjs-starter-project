import { HttpStatus } from '@nestjs/common';

export class CustomHttpException {
  constructor(
    public logNameSpace: string,
    public httpStatus: HttpStatus,
    public code: string,
    public message: string,
    public userMessage: string,
    public data?: any,
  ) {}
}
