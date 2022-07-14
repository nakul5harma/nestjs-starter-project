import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';
import moment = require('moment');

export function MaxDate(date: Date, format: string, validationOptions?: ValidationOptions) {
  return (object: any, propertyName: string) => {
    let defaultValidationOptions: ValidationOptions = {
      message: `${propertyName} must be valid date and less than ${date}`,
      always: true,
    };

    registerDecorator({
      name: 'MaxDate',
      target: object.constructor,
      propertyName,
      constraints: [date],
      options: validationOptions || defaultValidationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          if (!moment(value.toString(), format).isValid()) {
            defaultValidationOptions = {
              message: `Invalid Date`,
              always: true,
            };
            return false;
          }
          if (moment(value.toString(), format).isAfter(moment(date))) {
            return false;
          }
          return true;
        },
      },
    });
  };
}
