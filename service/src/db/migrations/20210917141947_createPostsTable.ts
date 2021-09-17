import { Knex } from "knex";
import { uuid } from "../columnHelpers";


export async function up(knex: Knex): Promise<void> {
	return knex.schema.createTableIfNotExists("posts", (table) => {
		uuid(knex, table);

		table.string("title");
		table.string("body");

		table.uuid('user_id').references('id').inTable('users');

		table.timestamps(true, true);
	})
}


export async function down(knex: Knex): Promise<void> {
	return knex.schema.dropTableIfExists("posts");
}

