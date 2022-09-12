import { Request, Response, NextFunction } from "express";
import { RedisClientType } from "redis";
import type { RedisRequestHandler } from "../../types";

const maxCountRequest = 10;
const requestDuration = 60 * 60 * 30;

export const RedisRequestLimiter = (client: RedisClientType) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const client_ip: string = req.ip;

    if (!client.isReady) return next();

    const response: string | null = await client.get(client_ip);

    console.log({ response });

    if (response !== null) {
      const resParser: RedisRequestHandler = JSON.parse(response);

      if (resParser.points > maxCountRequest)
        return res.json({
          fatal: true,
          message:
            "Esta ip ha sido bloqueada por enviar muchas peticiones en un corto periodo de tiempo, vuelve a intentarlo mas tarde",
        });
    }

    next();
  };
};
