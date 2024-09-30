require('dotenv').config();

import { DataSource } from 'typeorm';

const connectionSource = new DataSource({
  migrationsTableName: 'migrations',
  type: 'postgres',
  url: process.env.DATABASE_URL,
  synchronize: true,
  ssl:
    process.env.NODE_ENV !== 'local' && process.env.NODE_ENV !== 'test'
      ? { rejectUnauthorized: false }
      : false,
  logging: true,
  name: 'default',
  entities: ['./build/src/**/**.entity{.ts,.js}'],
  migrations: ['./build/src/migrations/**/*.js'],
  subscribers: ['./build/src/subscriber/**/*.js'],
});

export default connectionSource;
