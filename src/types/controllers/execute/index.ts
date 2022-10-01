import type { Mode } from "../general";

export interface ExecuteBody {
  /**Indica si el usuario tiene el rol de admin en discord */
  is_admin: boolean;
  /**El comando que se desea ejecutar en consola */
  command: string;
  /**Si @see ExecuteBody.console esta deshabilitado indicar a que usuario se le ejecutaria el comando,
   * si el usuario escribe directamente el comando /execute este parametro no es necesario */
  minecraft_user_name: string | null;
}
