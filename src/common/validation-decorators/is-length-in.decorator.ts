import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

type NonEmptyArray<T> = [T, ...T[]];

export function IsLengthIn(
  allowedLengths: NonEmptyArray<number>,
  validationOptions?: ValidationOptions,
) {
  return (object: any, propertyName: string) => {
    const validationMessage =
      allowedLengths.length === 1
        ? `${propertyName} length must be exactly ${allowedLengths[0]}`
        : `${propertyName} length must be exactly ${allowedLengths.slice(0, -1).join(', ')} or ${
            allowedLengths[allowedLengths.length - 1]
          }`;

    const defaultValidationOptions: ValidationOptions = {
      message: validationMessage,
      always: true,
    };

    registerDecorator({
      name: 'IsLengthIn',
      target: object.constructor,
      propertyName,
      constraints: [allowedLengths],
      options: validationOptions || defaultValidationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          return allowedLengths.includes(value.toString().trim().length);
        },
      },
    });
  };
}
