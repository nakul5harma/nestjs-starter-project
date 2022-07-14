import { MaxDate } from '../../max-date.decorator';

export const maxDate = new Date();
export const dateFormat = 'DD-MMM-YYYY';

class TestDto {
  @MaxDate(maxDate, dateFormat)
  dateOfBirth: string;

  constructor(dateOfBirth: string) {
    this.dateOfBirth = dateOfBirth;
  }
}

export const mockTestDto = new TestDto('22-JUL-1995');
export const mockInvalidDateTestDto = new TestDto('34-JUL-1995');
export const mockFutureDateTestDto = new TestDto('22-JUL-3995');
