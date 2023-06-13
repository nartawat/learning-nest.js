// Config that is common to more than one part of the app.

import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { TodoEntity } from '../todo/todo.entity';
import dotenv from 'dotenv';
dotenv.config();

const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: true,
  entities: [TodoEntity],
};

export { typeOrmConfig };
