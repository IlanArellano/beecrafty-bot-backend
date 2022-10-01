import { Request, Response, NextFunction } from "express";
import {
  get_API_Information,
  RCON,
  isValidMinecraftUsername,
} from "../../service";
import {
  ExecuteBody,
  PLAYER_API_ENDPOINT,
  Api_Response,
  Player_API_Response,
  Mode,
} from "../../types";
import replies from "../../messages";

export const ExecuteController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { command, minecraft_user_name } = req.body as ExecuteBody;

  const rcon = new RCON();

  try {
    let commandType: string;
    if (minecraft_user_name && !command.startsWith("execute")) {
      if (!isValidMinecraftUsername(minecraft_user_name))
        return next(replies.NOT_VALID_USER);

      //Verifica si el username que mando el usuario pertenece a una cuenta java o bedrock
      const Java_Player_Info: Api_Response<Player_API_Response> =
        await get_API_Information(
          PLAYER_API_ENDPOINT.player + minecraft_user_name
        );

      const type: Mode = Java_Player_Info.status === 200 ? "JAVA" : "BEDROCK";

      commandType = `execute as ${
        type === "BEDROCK" ? `${minecraft_user_name}` : minecraft_user_name
      } at @s run ${command}`;
    } else commandType = command;

    await rcon.connect(
      process.env.MINECRAFT_SERVER_IP,
      +process.env.MINECRAFT_SERVER_RCON_PORT,
      process.env.MINECRAFT_SERVER_RCON_PASSWORD
    );

    const response = await rcon.send(commandType);

    return res.status(200).json({
      command,
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
  }
};
