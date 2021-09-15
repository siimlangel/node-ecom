import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
	// Deletes ALL existing entries
	await knex("users").del();

	// Inserts seed entries
	await knex("users").insert([
		{ email: "siimlangel11@hotmail.com", password: "password1" },
		{ email: "jürnas@ut.ee", password: "password2" },
		{ email: "konrad@email.ee", password: "password3" }
	]);
}
