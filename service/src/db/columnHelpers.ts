import { Knex } from "knex"

const uuid = (knex: Knex, table: Knex.CreateTableBuilder): void => {
	table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
}

export { uuid };
