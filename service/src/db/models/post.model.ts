import { Model } from "objection";


class Post extends Model {

	title!: string;
	body!: string;

	static get tableName(): string {
		return "posts";
	}
}

export default Post;
