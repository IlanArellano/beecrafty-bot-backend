import { Request, Response, NextFunction } from "express";

export const CheckUserRegister = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  next();
};
