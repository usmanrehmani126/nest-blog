
import { DataSource } from "typeorm";
import {PostgresConnectionOptions} from "typeorm/driver/postgres/PostgresConnectionOptions"

const config: PostgresConnectionOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '1234',
  database: 'socialdatabase',
  entities: [__dirname + '/**/*.entity.{js,ts}'],
  migrationsTableName: 'migrations',
  migrations: [__dirname + '/migration/**/*.ts'],
};

const appDataSource = new DataSource(config);
export { appDataSource };


export default config;