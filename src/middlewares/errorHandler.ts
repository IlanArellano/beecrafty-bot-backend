import { Request, Response, NextFunction } from "express";
import { RedisClientType } from "redis";
import { initialRedis } from "../constants";
import type { RedisRequestHandler } from "../types";

const requestDuration: number = 60;

export const ErrorHandler =
  (client: RedisClientType) =>
  async (err: any, req: Request, res: Response, next: NextFunction) => {
    try {
      if (client.isReady) {
        const client_ip: string = req.clientIp;

        let obj: RedisRequestHandler;
        const findIp = await client.get(client_ip);

        if (findIp) {
          obj = JSON.parse(findIp) as RedisRequestHandler;
          obj = {
            ...obj,
            points: Number(obj.points) + 1,
          };
        } else {
          obj = { ...initialRedis, ip: client_ip };
        }

        console.log({ obj });

        const response = await client.setEx(
          client_ip,
          requestDuration,
          JSON.stringify(obj)
        );

        console.log({ responseSet: response });
      }

      if (typeof err === "string")
        return res.status(200).json({
          error: true,
          error_type: 1,
          fatal: false,
          message: err,
        });

      res.status(200).json({ ...err, fatal: true, error_type: 2 });
    } catch (error) {
      res.status(200).json({
        error: true,
        fatal: true,
        error_type: 3,
        message: error instanceof Error ? error.message : error,
      });
    }
  };
