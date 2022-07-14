import { ValueTransformer } from 'typeorm';

export class JSONValueTransformer implements ValueTransformer {
  to(jsonValue: any): any {
    return JSON.stringify(jsonValue);
  }
  from(stringifiedJsonValueFromDB: any): any {
    return JSON.parse(stringifiedJsonValueFromDB);
  }
}
