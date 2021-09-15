import { CustomError, NotFoundError, UnauthorizedError, UnprocessableEntityError } from "@errors";
import { NextFunction, Request, Response } from "express";
import { DataError } from "objection";
import PrettyError from "pretty-error";
import logger from "../logger";

const pe = new PrettyError();
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const errorHandler = (error: CustomError, req: Request, res: Response, _: NextFunction): Response => {
	logger.error(`${req.method} - ${req.path}`);
	logger.error(
		process.env.NODE_ENV === "production" ? error : pe.render(error)
	);

	const { name, message, details } = error;

	if (error instanceof DataError) {
		return res.status(422).json({
			name, message, details
		})
	}

	if (error instanceof UnprocessableEntityError) {
		return res.status(422).json({
			name, message, details
		})
	}

	if (error instanceof NotFoundError) {
		return res.status(404).send({
			name, message, details
		})
	}

	if (error instanceof UnauthorizedError) {
		return res.status(401).send({
			name, message, details
		})
	}

	return res.status(500).send({
		name, message, details
	})


}

export default errorHandler;
