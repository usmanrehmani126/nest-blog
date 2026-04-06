
import {PostgresConnectionOptions} from "typeorm/driver/postgres/PostgresConnectionOptions"

const ormConfig: PostgresConnectionOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '1234',
  database: 'socialdatabase',
};

export default ormConfig;