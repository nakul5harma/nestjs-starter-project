import { ValueTransformer } from 'typeorm';

export class NullValueTransformer implements ValueTransformer {
  to(text: string | null | undefined): string {
    return text ?? '';
  }
  from(text: string): string {
    return text;
  }
}
