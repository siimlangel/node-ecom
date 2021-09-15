import { ValidationError } from "express-validator";
import CustomError from "./CustomError";

class UnprocessableEntityError extends CustomError {
	constructor(message: string, code = 422, details: ValidationError[]) {
		super(message, code, details);
		this.name = "UnprocessableEntityError";
	}
}

export default UnprocessableEntityError;
