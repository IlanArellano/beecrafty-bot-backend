import { Router } from "express";
import { ExecuteController } from "./controller";
import { Headers, CheckAdminExecute } from "../../middlewares";

const ExecuteRouter = Router();

ExecuteRouter.post("/", [Headers, CheckAdminExecute], ExecuteController);

export { ExecuteRouter };
