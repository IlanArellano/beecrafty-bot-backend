import { Request, Response, NextFunction } from "express";
import { getServerContext, MYSQL_CONN_STATES } from "../../db";
import {
  MINECRAFT_WHITELIST_ALREADY_SET,
  MINECRAFT_MYSQL_USER_QUERIES,
} from "../../constants";
import {
  get_API_Information,
  RCON,
  isValidMinecraftUsername,
} from "../../service";
import type {
  RegisterBody,
  DBUsers,
  Api_Response,
  Player_API_Response,
  Mode,
} from "../../types";
import { PLAYER_API_ENDPOINT } from "../../types";

const { insert_user, select_by_discord_id, select_by_public_ip } =
  MINECRAFT_MYSQL_USER_QUERIES;

export const registerController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { discord_id, public_ip, username } = req.body as RegisterBody;
  let errorReponse: any;

  console.log({ ip: req.ip });

  const rcon = new RCON();
  const pool = getServerContext();
  let mode: Mode;

  try {
    //Verifica primero si el username de minecraft es valido
    const validUser = isValidMinecraftUsername(username);
    if (!validUser)
      return next({
        success: false,
        error_type: 0,
        response:
          "El usuario que has ingresado no es valido, verifica que este correctamente escrito y vuelve a intentarlo",
      });

    //Verifica si no hay un registro existente con el id del usuario de discord
    const CheckDiscordIdRegistered: DBUsers[] = await pool.query(
      select_by_discord_id,
      [discord_id]
    );

    if (CheckDiscordIdRegistered.length > 0) {
      return next({
        success: false,
        error_type: 1,
        response: "Solo se puede hacer un registro por usuario",
      });
    }

    //Verifica si no hay un registro existente con la ip del cliente
    const CheckIPRegistered: DBUsers[] = await pool.query(select_by_public_ip, [
      public_ip,
    ]);

    if (CheckIPRegistered.length > 0)
      return next({
        success: false,
        error_type: 2,
        response: "Solo se puede hacer un registro por ip",
      });

    //Verifica si el username que mando el usuario pertenece a una cuenta java o bedrock
    const Java_Player_Info: Api_Response<Player_API_Response> =
      await get_API_Information(PLAYER_API_ENDPOINT.player + username);

    mode = Java_Player_Info.status === 200 ? "JAVA" : "BEDROCK";

    const finalUsername =
      mode === "BEDROCK"
        ? `${process.env.MINECRAFT_SERVER_BEDROCK_PREFIX}${username}`
        : username;

    await rcon.connect(
      process.env.MINECRAFT_SERVER_IP,
      +process.env.MINECRAFT_SERVER_RCON_PORT,
      process.env.MINECRAFT_SERVER_RCON_PASSWORD
    );
    const response = await rcon.send(`whitelist add ${finalUsername}`);

    if (response === MINECRAFT_WHITELIST_ALREADY_SET)
      return next({
        success: false,
        response,
      });

    const InsertRes = await pool.query(insert_user, [
      finalUsername,
      discord_id,
      public_ip,
      mode,
    ]);

    console.log({ InsertRes });

    res.json({
      success: true,
      response,
    });
  } catch (error) {
    next({
      success: false,
      fatal: true,
      error,
    });
  } finally {
    if (rcon.online && rcon.authenticated) rcon.end();
    if (!!MYSQL_CONN_STATES.find((x) => x === pool.state)) pool.end();
  }
};
