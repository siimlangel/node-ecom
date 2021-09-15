import { ValidationError } from "express-validator";
import CustomError from "./CustomError";

class InternalError extends CustomError {
	constructor(message: string, code = 500, details: ValidationError[]) {
		super(message, code, details);
		this.name = "InternalError";
	}
}

export default InternalError;
