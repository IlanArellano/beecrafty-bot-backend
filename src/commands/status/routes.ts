import { Router } from 'express';
import { getUserStatus } from './controllers';

const statusRouter = Router();

statusRouter.get('/', getUserStatus);

export { statusRouter }