import { Router } from "express";
import { registerController } from "./controllers";

const registerRouter = Router();

registerRouter.post("/", registerController);

export { registerRouter };
