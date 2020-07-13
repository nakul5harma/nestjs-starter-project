import { TypeOrmModuleOptions } from '@nestjs/typeorm';

import { get } from 'config';

import { DBConfig } from '../models/config/db.config';

const dbConfig = get<DBConfig>('db');

const typeOrmConfig: TypeOrmModuleOptions = {
  type: dbConfig.type,
  host: dbConfig.host,
  port: dbConfig.port,
  username: dbConfig.username,
  password: dbConfig.password,
  database: dbConfig.database,
  entities: [__dirname + '../../database/**/*.entity.ts'],
  synchronize: false,
  migrationsTableName: 'migration',
  migrations: ['migrations/**/*{.ts,.js}'],
  cli: {
    migrationsDir: 'migrations',
  },
};

export = typeOrmConfig;
