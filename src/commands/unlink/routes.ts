import { Router } from "express";
import { UnlinkController } from "./controllers";

const unlinkRouter = Router();

unlinkRouter.post("/", UnlinkController);

export { unlinkRouter };
