import { maskStringForLogs } from './common.util';

export const DIGITS_INPUT_REGEX = new RegExp(`[^\\d]`, 'g');
export const PAN_NUMBER_REGEX_STRING = '[A-Z]{3}[P][A-Z][0-9]{4}[A-Z]{1}';

const JWT_TOKEN_REGEX_STRING = 'JWT [A-Za-z0-9-_]*\\.[A-Za-z0-9-_]*\\.[A-Za-z0-9-_]*';
const BASIC_TOKEN_REGEX_STRING = 'Basic [A-Za-z0-9\\+=]*';

const logMaskingRegex = new RegExp(
  `(?<![a-zA-Z0-9.])((${PAN_NUMBER_REGEX_STRING})|(${JWT_TOKEN_REGEX_STRING})|(${BASIC_TOKEN_REGEX_STRING}))(?![a-zA-Z0-9.])`,
  'g',
);

export const removeNonDigitCharacters = (textBefore: string) => {
  return textBefore.replace(DIGITS_INPUT_REGEX, '').trim();
};

export const maskPII = (textBefore: string) => {
  return textBefore
    .replace(logMaskingRegex, (piiData: string) => maskStringForLogs(piiData, 4))
    .trim();
};
