import { Request, Response, NextFunction } from "express";
import { RedisClientType } from "redis";
import { initialRedis } from "../../constants";
import type { RedisRequestHandler } from "../../types";

const maxCountRequest = 5;

export const RedisRequestLimiter = (client: RedisClientType) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const client_ip: string = req.ip;

    if (!client.isReady) return next();

    const response: string | null = await client.get(client_ip);

    if (response !== null) {
      const resParser: RedisRequestHandler = JSON.parse(response);

      if (resParser.points >= maxCountRequest) {
        return res.status(401).json({
          fatal: true,
          blocked: true,
          message:
            "Has superado el limite de intentos, vuelve a intentarlo mas tarde",
        });
      }
    }

    next();
  };
};
