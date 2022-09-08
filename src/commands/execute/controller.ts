import { Request, Response } from "express";
import { RCON } from "../../service";
import { ExecuteBody } from "../../types";

export const ExecuteController = async (req: Request, res: Response) => {
  const { command, is_console, minecraft_user_name, type } =
    req.body as ExecuteBody;

  const rcon = new RCON();

  let commandType: string;
  if (!is_console && minecraft_user_name && !command.startsWith("execute"))
    commandType = `execute as ${
      type === "BEDROCK" ? `${minecraft_user_name}` : minecraft_user_name
    } at @s run ${command}`;
  else commandType = command;

  try {
    await rcon.connect(
      process.env.MINECRAFT_SERVER_IP,
      +process.env.MINECRAFT_SERVER_RCON_PORT,
      process.env.MINECRAFT_SERVER_RCON_PASSWORD
    );

    const response = await rcon.send(commandType);

    return res.status(200).json({
      command,
      success: true,
      output: response,
    });
  } catch (error) {
    return res.status(404).json({
      error,
    });
  } finally {
    if (rcon.online && rcon.authenticated) rcon.end();
  }
};
