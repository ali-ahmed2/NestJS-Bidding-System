import { registerAs } from '@nestjs/config';
import { config as dotenvConfig } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';

dotenvConfig({ path: '.env' });

const config: DataSourceOptions = {
  type: 'mysql',
  host: `${process.env.MYSQL_HOST}`,
  port: parseInt(process.env.MYSQL_PORT || '3306'),
  username: `${process.env.MYSQL_USERNAME}`,
  password: `${process.env.MYSQL_PASSWORD}`,
  database: `${process.env.MYSQL_DATABASE}`,
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['dist/migrations/*{.ts,.js}'],
  migrationsRun: true,
  synchronize: false,
  timezone: 'Z',
};

export default registerAs('typeorm', () => config);
export const connectionSource = new DataSource(config);
