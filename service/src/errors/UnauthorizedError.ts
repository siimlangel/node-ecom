import { ValidationError } from "express-validator";
import CustomError from "./CustomError";

class UnauthorizedError extends CustomError {
	constructor(message: string, code = 401, details: ValidationError[]) {
		super(message, code, details);
		this.name = "UnauthorizedError";
	}
}

export default UnauthorizedError;
