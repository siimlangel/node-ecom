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

	await knex("users").select('id').then(async (ids) => {
		await knex("posts").insert([
			{title: "post1", body: "post1", user_id: ids[0].id},
			{title: "post2", body: "post2", user_id: ids[0].id},
			{title: "post3", body: "post3", user_id: ids[0].id},

			{title: "post4", body: "post4", user_id: ids[1].id},
			{title: "post5", body: "post5", user_id: ids[1].id},
			{title: "post6", body: "post6", user_id: ids[1].id},
			{title: "post7", body: "post7", user_id: ids[1].id},

			{title: "post8", body: "post8", user_id: ids[2].id},
			{title: "post9", body: "post9", user_id: ids[2].id},

		])
	})
}
