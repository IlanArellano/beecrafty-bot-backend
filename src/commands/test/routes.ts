import { Router } from 'express';
import { getTest } from './controller';

const testRouter = Router();

testRouter.get('/', getTest);

export { testRouter }