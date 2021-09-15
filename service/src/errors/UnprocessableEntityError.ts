import CustomError from "./CustomError";

class UnprocessableEntityError extends CustomError {
	constructor(message: string, code = 422, details: Record<string, unknown>) {
		super(message, code, details);
		this.name = "UnprocessableEntityError";
	}
}

export default UnprocessableEntityError;
