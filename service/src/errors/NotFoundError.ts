import { ValidationError } from "express-validator";
import CustomError from "./CustomError";

class NotFoundError extends CustomError {
	constructor(message: string, code = 404, details: ValidationError[]) {
		super(message, code, details);
		this.name = "NotFoundError";
	}
}

export default NotFoundError;
