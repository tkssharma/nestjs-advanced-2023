require('dotenv').config();

import { DataSource } from 'typeorm';

const connectionSource = new DataSource({
  migrationsTableName: 'migrations',
  type: 'postgres',
  url: process.env.DATABASE_URL,
  synchronize: false,
  ssl:
    process.env.NODE_ENV !== 'local' && process.env.NODE_ENV !== 'test'
      ? { rejectUnauthorized: false }
      : false,
  logging: false,
  name: 'default',
  entities: ['src/**/**.entity{.ts,.js}'],
  migrations: ['src/migrations/*.{js,ts}'],
  subscribers: ['src/subscriber/*{.ts,.js}'],
});

export default connectionSource;
