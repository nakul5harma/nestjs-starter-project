import { get } from 'config';

export const getDateInYYYYMMDDFormat = (date: Date) => {
  return date.toISOString().slice(0, 10);
};

export const isProductionEnv = () => {
  return get<string>('env') === 'PRODUCTION';
};
