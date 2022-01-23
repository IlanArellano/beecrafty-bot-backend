import { Request, Response } from "express";
import { execSP } from "../../service";
import {
  ERROR_PARAMS,
  ERROR_RESPONSE,
  SP_ERROR,
  UserInformation,
  Api_Response,
  Player_API_Response,
  PLAYER_API_ENDPOINT,
  MINECRAFT_TYPES,
} from "../../types";
import { get_API_Information } from "../../service";

const getIconURL = (
  uuid: string = process.env.STEVE_UUID_PLAYER,
  overlay: boolean = false
): string => {
  let url = process.env.MINECRAFT_ICON_URL + uuid;
  if (overlay) url = `${url}?overlay=true`;
  return url;
};

//GET
export const getUserStatus = async (req: Request, res: Response) => {
  try {
    const id_user_discord = req.query.id;
    if (!id_user_discord)
      return res.status(401).json({
        hasError: true,
        errorMessage: `${SP_ERROR}No se han enviado los argumentos correctos`,
      });

    const { output, estatus } = await execSP("GET_USER_INFO", [
      id_user_discord,
    ]);

    if (!estatus) {
      if (output === ERROR_PARAMS)
        return res.status(401).json({
          hasError: true,
          errorMessage: `${SP_ERROR}No se han enviado los argumentos correctos`,
        });
      if (output === ERROR_RESPONSE)
        return res.status(201).json({
          hasError: true,
          errorMessage:
            "No se ha podido recibir una respuesta por parte del servidor",
        });
      else {
        return res.status(201).json({
          hasError: true,
          errorMessage: output,
        });
      }
    }

    const split: string[] = output.split("|");
    let information: UserInformation = {
      username: split[0],
      activo: split[1] === "1",
      rango: split[2],
      hasError: false,
      errorMessage: "",
    };

    const Java_Player_Info: Api_Response<Player_API_Response> =
      await get_API_Information(
        PLAYER_API_ENDPOINT.player + information.username
      );

    let player_information = {};
    switch (Java_Player_Info.status) {
      //Si la respuesta de la API es 204 significa que no encontró ese nombre de usuario, por lo que se deduce que es un usuario de Bedrock
      case 204:
        player_information = {
          platform: MINECRAFT_TYPES.bedrock,
          uuid: null,
          icon_url: getIconURL(),
        };
        break;
      //Si se obtuvo respuesta quiere decir que es un usuario Java
      case 200:
        player_information = {
          platform: MINECRAFT_TYPES.java,
          uuid: Java_Player_Info.response?.id,
          icon_url: getIconURL(Java_Player_Info.response?.id, true),
        };
        break;
      //Si se obtiene una respuesta diferente, se califica como desconocido
      default:
        player_information = {
          platform: MINECRAFT_TYPES.unknown,
          uuid: null,
          icon_url: getIconURL(),
        };
        break;
    }

    information = {
      ...information,
      ...player_information,
    };

    res.status(200).json(information);
  } catch (error) {
    const response: UserInformation = {
      hasError: true,
      errorMessage: error,
    };
    res.status(500).json(response);
  }
};
