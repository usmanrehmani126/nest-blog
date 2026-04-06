
import {PostgresConnectionOptions} from "typeorm/driver/postgres/PostgresConnectionOptions"

const ormConfig: PostgresConnectionOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '1234',
  database: 'socialdatabase',
  entities: [__dirname + '/**/*.entity.js'],
  migrations: [__dirname + '/**/*.migration.js'],
  subscribers: [__dirname + '/**/*.subscriber.js'],
  synchronize: true,
  // cli: {
  //   entitiesDir: 'src/entity',
  //   migrationsDir: 'src/migration',
  //   subscribersDir: 'src/subscriber',
  // },
};

export default ormConfig;