import { Router } from "express";
import { postLink } from './controllers';

const LinkRouter = Router();

LinkRouter.post('/', postLink);

export { LinkRouter };
