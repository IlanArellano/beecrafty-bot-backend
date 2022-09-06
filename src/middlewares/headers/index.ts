import { Request, Response, NextFunction } from "express";
import { VerifyToken } from "../../service";

export const Headers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const headers = req.headers;
  const token: string = headers.authorization
    ? headers.authorization.slice(
        "Bearer ".length,
        headers.authorization.length
      )
    : "";

  const isValid: boolean = await VerifyToken(token);

  if (!isValid)
    return res.status(401).json({
      error: true,
      message: "El token enviado no es valido",
    });

  next();
};
