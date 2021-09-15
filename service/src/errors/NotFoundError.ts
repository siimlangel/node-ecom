import CustomError from "./CustomError";

class NotFoundError extends CustomError {
	constructor(message: string, code = 404, details: Record<string, unknown>) {
		super(message, code, details);
		this.name = "NotFoundError";
	}
}

export default NotFoundError;
