import { IsNotEmpty } from '../../is-not-empty.decorator';

class TestDto {
  @IsNotEmpty()
  firstName: string;

  constructor(firstName: string) {
    this.firstName = firstName;
  }
}

export const mockTestDto = new TestDto('John');
export const mockInvalidTestDto = new TestDto('');

export const mockValidationError = {
  isNotEmpty: 'firstName must not be empty',
};
