import { IsLengthIn } from '../../is-length-in.decorator';

class TestDto {
  @IsLengthIn([10])
  phone: number;

  @IsLengthIn([10])
  panNumber: string;

  constructor(phone: number, panNumber: string) {
    this.phone = phone;
    this.panNumber = panNumber;
  }
}

export const mockTestDto = new TestDto(9999999999, 'AAAAA0027A');
export const mockPhoneLengthSmallDto = new TestDto(999999999, 'AAAAA0027A');
export const mockPhoneLengthBigDto = new TestDto(999999999999, 'AAAAA0027A');
export const mockPanLengthSmallDto = new TestDto(9999999999, 'AAAAA0027');
export const mockPanLengthBigDto = new TestDto(9999999999, 'AAAAA0027AA');
export const mockInvalidTestDto = new TestDto(999999999, 'AAAAA0027AA');
