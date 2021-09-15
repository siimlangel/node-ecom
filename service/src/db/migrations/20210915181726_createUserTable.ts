import { Knex } from "knex";
import { uuid } from "../columnHelpers";


export async function up(knex: Knex): Promise<void> {
	return knex.schema.createTableIfNotExists("users", (table) => {
		uuid(knex, table);
		table.string('email').notNullable();
		table.string('password').notNullable();

		table.timestamps(true, true);
	});
}


export async function down(knex: Knex): Promise<void> {
	return knex.schema.dropTableIfExists("users");
}

