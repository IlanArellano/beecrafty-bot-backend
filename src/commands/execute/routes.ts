import { Router } from "express";
import { ExecuteController } from "./controller";
import { CheckAdminExecute } from "../../middlewares";

const ExecuteRouter = Router();

ExecuteRouter.post("/", [CheckAdminExecute], ExecuteController);

export { ExecuteRouter };
