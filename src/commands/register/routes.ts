import { Router } from "express";
import { registerController } from "./controllers";
import { Headers, CheckUserRegister } from "../../middlewares";

const registerRouter = Router();

registerRouter.post("/", [Headers, CheckUserRegister], registerController);

export { registerRouter };
