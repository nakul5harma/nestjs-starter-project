import { ValueTransformer } from 'typeorm';

export class NumericValueTransformer implements ValueTransformer {
  to(numericValue: number): number {
    return numericValue;
  }
  from(numericValueFromDB: string): number {
    return parseFloat(numericValueFromDB);
  }
}
