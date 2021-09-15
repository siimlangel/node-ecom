import { Model } from "objection";


class User extends Model {
	id!: string;
	email!: string;
	password!: string;

	static get tableName(): string {
		return "users";
	}

}

export default User;
