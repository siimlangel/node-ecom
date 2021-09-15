import { ValidationError } from "express-validator";

class CustomError extends Error {
	code: number;
	details?: ValidationError[]

	constructor(message: string, code: number, details: ValidationError[]) {
		super(message || String(code));
		this.code = code;
		this.name = "CustomError";

		if (details) {
			this.details = details;
		}


	}
}

export default CustomError;
