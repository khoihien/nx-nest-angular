import {ConfigType, registerAs} from "@nestjs/config";
import {Inject} from "@nestjs/common";

export const dbConfig = registerAs('db',() =>({
  uri: process.env.MONGO_URI || 'mongodb://localhost:27017',
  dbName: process.env.MONGO_DB_NAME || 'nx-nest-angular',
  dbUser: process.env.MONGO_DB_USER || 'exiUser'
}));

export type DbConfig = ConfigType<typeof dbConfig>;
export const InjectDbConfig = () => Inject(dbConfig.KEY)
