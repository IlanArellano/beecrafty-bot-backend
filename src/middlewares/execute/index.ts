import { Request, Response, NextFunction } from "express";
import { excludeCommands } from "./excludeCommands";
import type { ExecuteBody } from "../../types";

export const CheckAdminExecute = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { command, is_admin } = req.body as ExecuteBody;

  const commandSplit: string[] = command.trim().split(/ +/);
  //Si se detecta que el comando esta en la lista de comandos que solo puede ejecutar el administrador entonces le mandara un error
  if (!is_admin && excludeCommands.find((x) => x.includes(commandSplit[0])))
    return res.status(301).json({
      command,
      success: false,
      output: `Lo sentimos, no tienes permisos suficientes para ejecutar el comando ${commandSplit[0]}`,
    });

  next();
};
