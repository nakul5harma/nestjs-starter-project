import * as config from '../../../config';

const env = config.get<string>('env');

export enum EnvironmentTypes {
  DEVELOPMENT = 'development',
  E2E_TEST = 'e2e_test',
  TEST = 'test',
  QA = 'qa',
  STAGING = 'staging',
  PRODUCTION = 'production',
}

export const ENVIRONMENT = EnvironmentTypes[env];
