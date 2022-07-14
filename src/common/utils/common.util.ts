import { AxiosError } from 'axios';
import moment = require('moment');

import { EnvironmentTypes, ENVIRONMENT } from '../configs/environment.config';

export const getDateInYYYYMMDDFormat = (date: Date): string => {
  return date.toISOString().slice(0, 10);
};

export const getDateInMMDDYYYYFormat = (date: Date): string => {
  return moment(date).format('MM-DD-YYYY');
};

export const getCurrentUTCDate = () => {
  return new Date(new Date().toUTCString().slice(0, -3));
};

export const isProductionEnv = (): boolean => {
  return ENVIRONMENT === EnvironmentTypes.PRODUCTION;
};

export const isDevelopmentEnv = (): boolean => {
  return ENVIRONMENT === EnvironmentTypes.DEVELOPMENT;
};

export const maskStringWithAsterisk = (stringToMask: string, noOfCharsToLeftUnMasked: number) => {
  const maskedString = stringToMask
    .substring(0, stringToMask.length - noOfCharsToLeftUnMasked)
    .replace(/[a-zA-Z0-9]/g, '*');
  const unmaskedString = stringToMask.substring(stringToMask.length - noOfCharsToLeftUnMasked);

  return maskedString + unmaskedString;
};

export const maskStringForLogs = (stringToMask: string, noOfCharsToLeftUnMasked: number) => {
  const maskedString = stringToMask
    .substring(0, stringToMask.length - noOfCharsToLeftUnMasked)
    .replace(/[0-9]/g, '9')
    .replace(/[a-zA-Z]/g, '*');
  const unmaskedString = stringToMask.substring(stringToMask.length - noOfCharsToLeftUnMasked);

  return maskedString + unmaskedString;
};

export const roundToTwoDecimalNumbers = (value) => {
  if (typeof value === 'string') {
    value = parseFloat(value);
  }

  if (!isNaN(value) && typeof value === 'number') {
    return Math.round(value * 100) / 100;
  }

  return value;
};

export const getResponseObjectFromAxiosError = (err: AxiosError) => {
  if (err.isAxiosError) {
    if (err.response.data) {
      return err.response.data;
    }
    return err.response;
  } else {
    return JSON.parse(JSON.stringify(err, Object.getOwnPropertyNames(err)));
  }
};

export const isJSON = (item) => {
  item = typeof item !== 'string' ? JSON.stringify(item) : item;

  try {
    item = JSON.parse(item);
  } catch (e) {
    return false;
  }

  if (typeof item === 'object' && item !== null) {
    return true;
  }

  return false;
};

export const stringToEnum = <ET, T>(enumObj: ET, str: string): T => {
  return enumObj[str as string];
};

export const getCustomKey = (value: string) => {
  return value
    .split(/(?=[A-Z])/)
    .join('_')
    .toUpperCase();
};
