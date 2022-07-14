import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

export function IsGreaterThan(property: string, validationOptions?: ValidationOptions) {
  return (object: any, propertyName: string) => {
    const defaultValidationOptions: ValidationOptions = {
      always: true,
    };
    registerDecorator({
      name: 'IsGreaterThan',
      target: object.constructor,
      propertyName,
      constraints: [property],
      options: validationOptions || defaultValidationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const [relatedPropertyName] = args.constraints;
          const relatedValue = (args.object as any)[relatedPropertyName];
          return value > relatedValue;
        },
        defaultMessage(validationArguments: ValidationArguments) {
          return `${propertyName} should be greater than the ${validationArguments.constraints}`;
        },
      },
    });
  };
}
