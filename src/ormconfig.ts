// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

import { join } from 'path';
import { ConnectionOptions } from 'typeorm';

const config = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10) || 5432,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  migrations: [join(__dirname, './migration', '*{.ts,.js}')],
  entities: [join(__dirname, 'app', '**/*.entity{.ts,.js}')],
  migrationsRun: process.env.RUN_MIGRATION || false,
  cli: {
    migrationsDir: './src/migration',
  },
} as ConnectionOptions;

export default config;
