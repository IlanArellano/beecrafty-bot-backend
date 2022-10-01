import type { Request, Response, NextFunction } from "express";
import type { UnlinkBody } from "../../types";

export const UnlinkController = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { discord_id, reason } = req.body as UnlinkBody;
};
