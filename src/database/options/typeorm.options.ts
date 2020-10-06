import { TypeOrmModuleOptions } from '@nestjs/typeorm';

import { get } from 'config';

import { DBConfig } from '../../shared/models/config/db.config';

const dbConfig: DBConfig = get<DBConfig>('db');

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: dbConfig.type,
  host: dbConfig.host,
  port: dbConfig.port,
  username: dbConfig.username,
  password: dbConfig.password,
  database: dbConfig.database,
  entities: [__dirname + '/../entities/*.entity.{ts,js}'],
  synchronize: false,
};
