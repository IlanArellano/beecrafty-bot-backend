import { Request, Response, NextFunction } from "express";
import { RedisClientType } from "redis";

export const ErrorHandler =
  (client: RedisClientType) =>
  (err: any, req: Request, res: Response, next: NextFunction) => {
    res.status(200).json(err);
  };
