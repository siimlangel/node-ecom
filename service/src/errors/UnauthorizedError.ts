import CustomError from "./CustomError";

class UnauthorizedError extends CustomError {
	constructor(message: string, code = 401, details: Record<string, unknown>) {
		super(message, code, details);
		this.name = "UnauthorizedError";
	}
}

export default UnauthorizedError;
