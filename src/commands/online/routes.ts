import { Router } from 'express';
import { getServerStatus } from './controllers';

const onlineRouter = Router();

onlineRouter.get('/', getServerStatus);

export { onlineRouter }