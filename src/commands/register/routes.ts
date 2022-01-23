import { Router } from "express";
import { getRegister } from './controllers';

const registerRouter = Router();

registerRouter.get('/', getRegister);

export { registerRouter };
