import { Validator, ValidationError } from 'class-validator';

import {
  mockTestDto,
  mockPhoneLengthSmallDto,
  mockPhoneLengthBigDto,
  mockPanLengthSmallDto,
  mockPanLengthBigDto,
  mockInvalidTestDto,
} from './test-data/is-length-in.decorator.testdata';

describe('IsLengthIn', () => {
  const validator = new Validator();

  it('Should validate DTO successfully', async () => {
    const validatorErrors: ValidationError[] = await validator.validate(mockTestDto);

    expect(validatorErrors.length).toEqual(0);
  });

  it('Validation should fail when number length is smaller', async () => {
    const validatorErrors: ValidationError[] = await validator.validate(mockPhoneLengthSmallDto);

    expect(validatorErrors.length).toEqual(1);
    expect(validatorErrors[0].constraints).toEqual({
      IsLengthIn: 'phone length must be exactly 10',
    });
  });

  it('Validation should fail when number length is bigger', async () => {
    const validatorErrors: ValidationError[] = await validator.validate(mockPhoneLengthBigDto);

    expect(validatorErrors.length).toEqual(1);
    expect(validatorErrors[0].constraints).toEqual({
      IsLengthIn: 'phone length must be exactly 10',
    });
  });

  it('Validation should fail when string length is smaller', async () => {
    const validatorErrors: ValidationError[] = await validator.validate(mockPanLengthSmallDto);

    expect(validatorErrors.length).toEqual(1);
    expect(validatorErrors[0].constraints).toEqual({
      IsLengthIn: 'panNumber length must be exactly 10',
    });
  });

  it('Validation should fail when string length is bigger', async () => {
    const validatorErrors: ValidationError[] = await validator.validate(mockPanLengthBigDto);

    expect(validatorErrors.length).toEqual(1);
    expect(validatorErrors[0].constraints).toEqual({
      IsLengthIn: 'panNumber length must be exactly 10',
    });
  });

  it('Validation should fail when DTO is invalid', async () => {
    const validatorErrors: ValidationError[] = await validator.validate(mockInvalidTestDto);

    expect(validatorErrors.length).toEqual(2);
    expect(validatorErrors[0].constraints).toEqual({
      IsLengthIn: 'phone length must be exactly 10',
    });
    expect(validatorErrors[1].constraints).toEqual({
      IsLengthIn: 'panNumber length must be exactly 10',
    });
  });
});
