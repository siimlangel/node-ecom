import { Request } from "express";
import { Result, ValidationError, validationResult } from "express-validator";
import { UnprocessableEntityError } from "@errors";

const handleValidationErrors = (req: Request) : void => {
	const validationErrors: Result<ValidationError> = validationResult(req);

	if (!validationErrors.isEmpty()) {
		throw new UnprocessableEntityError(
			"Unprocessable Entity",
			422,
			validationErrors.array()
		)
	}
}

export default handleValidationErrors;
