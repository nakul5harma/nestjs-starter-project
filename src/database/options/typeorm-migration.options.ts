import { TypeOrmModuleOptions } from '@nestjs/typeorm';

import { get } from '../../../config';
import { DBConfig } from '../../common/models/configs/db.config';

const dbConfig = get<DBConfig>('db');

const typeOrmConfig: TypeOrmModuleOptions = {
  type: dbConfig.type,
  host: dbConfig.host,
  port: dbConfig.port,
  username: dbConfig.username,
  password: dbConfig.password,
  database: dbConfig.database,
  entities: [__dirname + '/../entities/*.entity.{ts,js}'],
  synchronize: false,
  migrationsTableName: 'migration',
  migrations: ['migrations/**/*.ts'],
};

export = typeOrmConfig;
