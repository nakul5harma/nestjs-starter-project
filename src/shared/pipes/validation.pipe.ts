import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';

import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';

import { LoggerService } from '../logger/logger.service';
import { ValidationException } from '../exceptions/validation.exception';
import { validatorOptions } from '../options/validator.options';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  private readonly logNamespace = `pipe.${ValidationPipe.name.toLowerCase()}`;
  private readonly logger = LoggerService.getLoggerServiceInstance();

  async transform(value: any, metadata: ArgumentMetadata) {
    const { metatype } = metadata;

    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    const object = plainToClass(metatype, value);
    const validationErrors = await validate(object, validatorOptions);

    if (validationErrors.length > 0) {
      this.logger.warn(
        `${this.logNamespace}.transform.warned`,
        `Validation failed for ${metatype.name}`,
        'validationErrors:',
        validationErrors,
      );

      throw new ValidationException(validationErrors);
    }

    return value;
  }

  private toValidate(metatype: any): boolean {
    const types = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}
