import { Validator, ValidationError } from 'class-validator';

import {
  mockTestDto,
  mockInvalidDateTestDto,
  mockFutureDateTestDto,
  maxDate,
} from './test-data/max-date.decorator.testdata';

describe('MaxDate', () => {
  const validator = new Validator();

  it('Should validate DTO successfully', async () => {
    const validatorErrors: ValidationError[] = await validator.validate(mockTestDto);

    expect(validatorErrors.length).toEqual(0);
  });

  it('Should fail DTO validation if the date is invalid', async () => {
    const validatorErrors: ValidationError[] = await validator.validate(mockInvalidDateTestDto);

    expect(validatorErrors.length).toEqual(1);
    expect(validatorErrors[0].constraints).toEqual({
      MaxDate: `dateOfBirth must be valid date and less than ${maxDate}`,
    });
  });

  it('Should fail DTO validation if the date is in future', async () => {
    const validatorErrors: ValidationError[] = await validator.validate(mockFutureDateTestDto);

    expect(validatorErrors.length).toEqual(1);
    expect(validatorErrors[0].constraints).toEqual({
      MaxDate: `dateOfBirth must be valid date and less than ${maxDate}`,
    });
  });
});
