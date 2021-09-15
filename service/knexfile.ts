import { knexSnakeCaseMappers } from "objection";
import dotenv from 'dotenv';

dotenv.config();
interface KnexConfig {
	[key: string]: Record<string, unknown>;
}


const knexConfig: KnexConfig = {

	development: {
		client: 'postgresql',
		connection: {
			port: process.env.DB_PORT,
			host: process.env.DB_HOST,
			database: process.env.DB_NAME,
			user: process.env.DB_USER,
			password: process.env.DB_PASSWORD
		},
		pool: {
			min: 2,
			max: 10
		},
		migrations: {
			directory: './src/db/migrations',
			tableName: 'knex_migrations'
		},
		seeds: {
			directory: './src/db/seeds'
		},
		...knexSnakeCaseMappers
	}

};

export default knexConfig;
