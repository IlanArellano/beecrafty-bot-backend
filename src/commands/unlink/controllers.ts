import type { Request, Response, NextFunction } from "express";
import {
  MINECRAFT_MYSQL_USER_QUERIES,
  MINECRAFT_WHITELIST_NOT_FOUND,
} from "../../constants";
import { RCON } from "../../service";
import type { UnlinkBody, DBUsers } from "../../types";
import { getServerContext, MYSQL_CONN_STATES } from "../../db";

const { select_by_discord_id, inactive_user } = MINECRAFT_MYSQL_USER_QUERIES;

export const UnlinkController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { discord_id, reason } = req.body as UnlinkBody;

  const rcon = new RCON();
  const pool = getServerContext();

  try {
    const UserObj: DBUsers[] = await pool.query(select_by_discord_id, [
      discord_id,
    ]);

    if (UserObj.length === 0)
      return next(
        "No tienes ningun usuario de Minecraft agregado a este servidor"
      );

    const { username, active, mode } = UserObj[0];
    if (active === false)
      return next(
        "No se puede continuar debido a que tu usuario ya se encuentra inactivo"
      );

    await rcon.connect(
      process.env.MINECRAFT_SERVER_IP,
      +process.env.MINECRAFT_SERVER_RCON_PORT,
      process.env.MINECRAFT_SERVER_RCON_PASSWORD
    );

    const cmd: string =
      mode === "JAVA"
        ? `whitelist remove ${username}`
        : `fwhitelist remove ${username}`;

    const response = await rcon.send(cmd);

    if (response === MINECRAFT_WHITELIST_NOT_FOUND) return next(response);

    await pool.query(inactive_user, [reason || null, discord_id]);

    res.json({
      success: true,
      message: `Hemos encontrado a tu usuario ${username}, que fue removido de nuestro servidor correctamente, esperemos vuelvas pronto`,
    });
  } catch (error) {
    next({
      error: true,
      message: error instanceof Error ? error.message : error,
    });
  } finally {
    if (rcon.online && rcon.authenticated) rcon.end();
    if (!!MYSQL_CONN_STATES.find((x) => x === pool.state)) pool.end();
  }
};
