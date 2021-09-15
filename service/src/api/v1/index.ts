import { Router } from "express";
import usersRouter from "./user.router";

const router: Router = Router();

router.use(usersRouter);

export default router;
