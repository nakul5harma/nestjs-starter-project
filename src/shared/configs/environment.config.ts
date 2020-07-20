import * as config from 'config';

const env = config.get<string>('env');

export enum EnvironmentTypes {
  DEVELOPMENT = 'DEVELOPMENT',
  E2E_TEST = 'E2E_TEST',
  TEST = 'TEST',
  QA = 'QA',
  TRAINING = 'TRAINING',
  UAT = 'UAT',
  PRODUCTION = 'PRODUCTION',
}

export const ENVIRONMENT = EnvironmentTypes[env];
