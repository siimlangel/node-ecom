import { NotFoundError } from "@errors";
import { User } from "@models";
import { Router, Request, Response, NextFunction } from "express";

const usersRouter: Router = Router();

usersRouter.get('/users', async (_: Request, res: Response) => {
	const users = await User.query();
	return res.status(200).send(users);
})

usersRouter.get('/users/:id', async (req: Request, res: Response, next: NextFunction) => {
	const id: any = req.params.id;
	try {
		const user = await User.query().findById(id);
		if (user === undefined) throw new NotFoundError("User not found", undefined, {});
		return res.status(200).send(user);
	} catch (e) {
		return next(e);
	}
})

export default usersRouter;
