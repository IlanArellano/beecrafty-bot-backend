import { Request, Response } from "express";
import { RCON } from "../../service";
import { getServerContext, MYSQL_CONN_STATES } from "../../db";
import type { RegisterBody } from "../../types";

export const registerController = async (req: Request, res: Response) => {
  const { discord_id, mode, public_ip, username } = req.body as RegisterBody;

  const rcon = new RCON();
  const pool = getServerContext();

  try {
    const CheckUserRegistered = await pool.query(
      "SELECT * FROM users WHERE username = ?",
      [username]
    );

    // @ts-ignore: Unreachable code error
    console.log({ result: CheckUserRegistered[0] });

    await rcon.connect(
      process.env.MINECRAFT_SERVER_IP,
      +process.env.MINECRAFT_SERVER_RCON_PORT,
      process.env.MINECRAFT_SERVER_RCON_PASSWORD
    );
    const response = rcon.send(`whitelist add ${username}`);

    res.json({
      success: true,
      response,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      error,
    });
  } finally {
    if (rcon.online && rcon.authenticated) rcon.end();
    if (MYSQL_CONN_STATES.find((x) => x === pool.state)) pool.end();
  }
};
