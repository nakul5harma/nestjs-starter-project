import { Validator, ValidationError } from 'class-validator';

import {
  mockTestDto,
  mockInvalidTestDto,
  mockValidationError,
} from './test-data/is-not-empty.decorator.testdata';

describe('IsNotEmpty', () => {
  const validator = new Validator();

  it('Should validate DTO successfully', async () => {
    const validatorErrors: ValidationError[] = await validator.validate(
      mockTestDto,
    );

    expect(validatorErrors.length).toEqual(0);
  });

  it('Should fail DTO validation if the string is empty', async () => {
    const validatorErrors: ValidationError[] = await validator.validate(
      mockInvalidTestDto,
    );

    expect(validatorErrors.length).toEqual(1);
    expect(validatorErrors[0].constraints).toEqual(mockValidationError);
  });
});
