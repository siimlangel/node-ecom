import Post from "./post.model";
import { Model } from "objection";


class User extends Model {
	id!: string;
	email!: string;
	password!: string;

	static get tableName(): string {
		return "users";
	}

	static relationMappings = {
		posts: {
			relation: Model.HasManyRelation,
			modelClass: Post,
			join: {
				from: 'users.id',
				to: 'posts.user_id'
			}
		}
	}


}

export default User;
