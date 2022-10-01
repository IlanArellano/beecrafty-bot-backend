import { Request, Response, NextFunction } from "express";
import { getServerContext, MYSQL_CONN_STATES } from "../../db";
import {
  MINECRAFT_WHITELIST_ALREADY_SET,
  MINECRAFT_MYSQL_USER_QUERIES,
} from "../../constants";
import { RCON, isValidMinecraftUsername } from "../../service";
import type { RegisterBody, DBUsers } from "../../types";
import replies from "../../messages";

const { insert_user, select_by_discord_id, select_by_public_ip } =
  MINECRAFT_MYSQL_USER_QUERIES;

export const registerController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { discord_id, username, mode } = req.body as RegisterBody;
  const public_ip = req.ip;

  const rcon = new RCON();
  const pool = getServerContext();

  try {
    //Verifica si se envio como plataforma Java o Bedrock
    if (mode !== "JAVA" && mode !== "BEDROCK")
      return next("Solo puedes elegir como plataformas Java o Bedrock");
    //Verifica primero si el username de minecraft es valido
    if (!isValidMinecraftUsername(username))
      return next(replies.NOT_VALID_USER);

    //Verifica si no hay un registro existente con el id del usuario de discord
    const CheckDiscordIdRegistered: DBUsers[] = await pool.query(
      select_by_discord_id,
      [discord_id]
    );

    if (CheckDiscordIdRegistered.length > 0)
      return next("Solo se puede hacer un registro por usuario");

    //Verifica si no hay un registro existente con la ip del cliente
    /*  const CheckIPRegistered: DBUsers[] = await pool.query(select_by_public_ip, [
      public_ip,
    ]);

    if (CheckIPRegistered.length > 0)
      return next("Solo se puede hacer un registro por ip");*/

    await rcon.connect(
      process.env.MINECRAFT_SERVER_IP,
      +process.env.MINECRAFT_SERVER_RCON_PORT,
      process.env.MINECRAFT_SERVER_RCON_PASSWORD
    );

    const cmd: string =
      mode === "JAVA"
        ? `whitelist add ${username}`
        : `fwhitelist add ${username}`;
    const response = await rcon.send(cmd);

    if (response === MINECRAFT_WHITELIST_ALREADY_SET) return next(response);

    await pool.query(insert_user, [username, discord_id, public_ip, mode]);

    res.json({
      success: true,
      message: response,
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
