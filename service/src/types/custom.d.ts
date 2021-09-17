import { User as UserModel } from "@models";

declare global {
  namespace Express {
		export class User extends UserModel {
			id: string
		}
	}
}
