import * as dotenv from 'dotenv';

dotenv.config();

const config = {
  'env': process.env.ENV || 'development',
  'server': {
    port: process.env.PORT,
    logLevel: process.env.LOG_LEVEL,
  },
  'db': {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
  },
  'api-logging': {
    includeRequestHeaders: ['x-consumer-profile'],
    excludeResponseHeaders: ['x-powered-by'],
    ignoreRoutes: [],
  },
};

export const get = <T>(keyPath: string): T => {
  const paths = keyPath.split('.');
  let value = config;

  for (const path of paths) {
    if (value[path] !== undefined) {
      value = value[path];
    } else {
      throw new Error(`Config value doesn't exist for key: ${keyPath}`);
    }
  }

  if ((value as any) === 'true') {
    return true as any;
  } else if ((value as any) === 'false') {
    return false as any;
  } else if ((value as any) === 'null') {
    return null;
  }

  return value as any;
};

export const getOrDefault = <T>(keyPath: string, defaultValue: T): T => {
  try {
    return get<T>(keyPath);
  } catch (error) {
    return defaultValue;
  }
};

export const getCustom = <T>(customKey: string, fallbackKey: string): T => {
  const value = process.env[customKey];
  if (value) {
    return value as any;
  } else {
    return get<T>(fallbackKey);
  }
};
