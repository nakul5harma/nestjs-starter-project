import { BadRequestException } from '@nestjs/common';

import { ValidationError } from 'class-validator';

import { ResponseMessages } from '../constants/response-messages.constants';

export class ValidationException extends BadRequestException {
  constructor(public readonly validationErrors?: ValidationError[]) {
    super(ResponseMessages.INVALID_REQUEST_PAYLOAD.message);
  }

  getErrorMessage() {
    try {
      return this.validationErrors && this.validationErrors.length
        ? this.formatErrors(this.validationErrors, '').slice(0, -2)
        : ResponseMessages.INVALID_REQUEST_PAYLOAD.message;
    } catch (error) {
      return error;
    }
  }

  private formatErrors(errors: ValidationError[], errorMessage: string): string {
    if (!errors || errors.length === 0) {
      return errorMessage;
    }

    errors.forEach((error) => {
      if (error.constraints !== undefined) {
        const errorConstraints: string[] = Object.keys(error.constraints);

        for (const property of errorConstraints) {
          errorMessage += error.constraints[property] + ', ';
        }
      }

      errorMessage = this.formatErrors(error.children, errorMessage);
    });

    return errorMessage;
  }
}
