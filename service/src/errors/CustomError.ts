
class CustomError extends Error {
	code: number;
	// details?: Record<string, unknown>
	details?: object;

	constructor(message: string, code: number, details: Record<string, unknown>) {
		super(message || String(code));
		this.code = code;
		this.name = "CustomError";

		if (details) {
			this.details = details;
		}


	}
}

export default CustomError;
